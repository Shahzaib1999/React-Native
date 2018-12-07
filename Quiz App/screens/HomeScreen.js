import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Button, ScrollView } from "react-native";
import { Camera, Permissions, FaceDetector } from "expo";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasCameraPermission: null, 
      type: Camera.Constants.Type.front,
      pic: false,
      quiz: [],
      face: false,
      faces: [],
      index: 0,
      correct: 0,
      finish: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log('photo*************',photo);
      this.setState({pic:photo, faces: []});
    }
  };

  async getMoviesFromApi() {
  try {
    console.log('*******************************************************');
    
    let response = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
    let responseJson = await response.json();
    this.setState({ quiz: responseJson.results }, function () {
      console.log(responseJson.results);
      return responseJson;

    });
  } catch (error) {
    console.error(error);
  }
}

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      this.setState({ faces, face: true });
    }
    else{
      this.setState({ faces: [], face: false });
    }
  };

  back = () =>{
    this.setState({pic: false})
  }

  renderFaces = () =>
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}>
      </View>
    );
  }

  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }

  check(ans){
    const { quiz,index, correct} = this.state;
    if (index === 10) {
      this.setState({
       index: 0
      })
    }
    else{
      if (quiz[index].correct_answer === ans) {
        this.setState({
          index: index+1, correct: correct+1
        })
      }
      else{
        this.setState({
          index: index + 1
        })
      }
    }
  }

  again(){
    this.setState({
      index: 0, correct: 0
    })
  }


  render() {
    const { hasCameraPermission, pic, quiz, face, index, correct } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return <View style={{ flex: 1 }}>
          {pic ? <View style={{ flex: 1, flexDirection: "column" }}>
              {quiz.length > 0 ? <ScrollView style={styles.container}>
                  {index < 10 ? <TouchableOpacity style={{ flex: 0.1, alignSelf: "center", alignItems: "center" }}>
                    <View style={{ height: 600 }}>
                      
                      <Text style={style.ques}>
                        {"\n"}Q{index + 1}) {quiz[index].question + "\n"}
                      </Text>
                      <Button onPress={() => this.check(quiz[index].correct_answer)} style={{ marginTop: 50 }} title={quiz[index].correct_answer} />
                      <Button onPress={() => this.check("A")} title={quiz[index].incorrect_answers[0]} />
                      <Button onPress={() => this.check("b")} style={{ marginTop: 50 }} title={quiz[index].incorrect_answers[1]} />
                      <Button onPress={() => this.check("b")} style={{ marginTop: 50 }} title={quiz[index].incorrect_answers[2]} />
                      
                      <Text>{this.state.text}</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text>Your score is {correct}</Text>
                    <Button onPress={this.again.bind(this)} title="Play again" />
                  </View>}
                </ScrollView> : <View>
                  <Image source={pic} style={{ width: 250, height: 250, marginLeft: 50 }} />
                  <TouchableOpacity style={{ flex: 0.1, alignSelf: "center", alignItems: "center" }} />
                  <Text style={style.btn} />
                  {face ? <Button onPress={this.getMoviesFromApi.bind(this)} title="Start quiz" color="#0BADE3" /> : <View style={{ alignSelf: "center", alignItems: "center" }}>
                      <Text style={{ alignItems: "center" }}>
                        No face detected
                      </Text>
                      <Button onPress={this.back.bind(this)} title="Take picture again" />
                    </View>}
                </View>}
            </View> : <Camera onFacesDetected={this.handleFacesDetected} faceDetectorSettings={{ mode: FaceDetector.Constants.Mode.fast, detectLandmarks: FaceDetector.Constants.Mode.none, runClassifications: FaceDetector.Constants.Mode.none }} style={{ flex: 1 }} type={this.state.type} ref={ref => {
                this.camera = ref;
              }}>
              <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "column" }}>
                <TouchableOpacity style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }} onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 10,
                      color: "white"
                    }}
                  >
                    Flip
                  </Text>
                </TouchableOpacity>
                
              </View>
              <Button onPress={this.snap.bind(this)} title="Capture" color="#0BADE3" />
            </Camera>}
          {this.state.faces.length ? this.renderFaces() : undefined}
        </View>;
    }
  }
}

const style = StyleSheet.create({
  btn: {
    color: "red",
    marginTop: 30
  },
  ques: {
    color: "black",
    fontWeight: "bold"
  },
  mcq: {
    color: "black"
    // fontWeight: "normal"
  },
  contentContainer: {
    // paddingVertical: 200
    height: 800
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  camera: {
    flex: 1,
    justifyContent: "space-between"
  },
  face: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 1,
    position: "absolute",
    borderColor: "#808000",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  faceText: {
    color: "#32CD32",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent"
  },
  facesContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  textcolor: {
    color: "#008080"
  }
});
