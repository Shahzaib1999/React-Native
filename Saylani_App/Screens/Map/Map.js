import React, { Component } from "react";
import { 
    View,
    Dimensions,
    StyleSheet,
    Image,
    Text
} from "react-native";
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
// import Expo from 'expo';
import { Permissions, Location } from 'expo';

import marker from '../../assets/icons8-marker.png'

class Map extends Component {
    // constructor (props) {
    //   super(props)
    // //   this.state = {
    // //     region: {
    // //       latitude: 47.6062,
    // //       longitude: 122.3321,
    // //       latitudeDelta: 0.02,
    // //       longitudeDelta: 0.02
    // //     }
    // //   }
    // }

    state ={
        latitude:24.0000000,
        longitude:66.0000000,
        condition:false
      }

      
_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location ,condition:true });
    console.log('current location===',location)
    
  }; 

  

 


componentDidMount(){
  this._getLocationAsync()
}

onRegionChange = region => {
    this.setState({
      region
    })
  }
  
    render () {
      return (
          <View style={styles.container}>
        {/* {this.state.condition && <MapView showsUserLocation followsUserLocation initialRegion={{
            latitude:this.state.location.coords.latitude,
            longitude:this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }} onRegionChangeComplete={this.onRegionChange} style={{height: 500, width: 300}} >
            
                  <MapView.Marker
                      coordinate={this.state.location.coords}
                      title={'Your Location'}
                      pinColor={'red'}
                  />

            </MapView> }
              <View style={styles.markerFixed}>
                  <Image style={styles.marker} source={marker} />
              </View>
              {this.state.region ? <Text>{this.state.region.longitude}</Text>: <Text></Text>} */}
              <Image source={require('../../assets/loader.gif')} />
            </View>
      )
    }
  
  }
export default Map;

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Expo.Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
        // padding: 8,
      },
      markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
      marker: {
        height: 48,
        width: 48
      },
});






    // uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    
    //     var ref = firebase.storage().ref().child("images/" + imageName);
    //     return ref.put(blob);
    //   }

    // getSelectedImages = (selectedImages, currentImage) => {
    
    //     const image = currentImage.uri
     
    //     const Blob = RNFetchBlob.polyfill.Blob
    //     const fs = RNFetchBlob.fs
    //     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    //     window.Blob = Blob
     
       
    //     let uploadBlob = null
    //     const imageRef = firebase.storage().ref('posts').child("test.jpg")
    //     let mime = 'image/jpg'
    //     fs.readFile(image, 'base64')
    //       .then((data) => {
    //         return Blob.build(data, { type: `${mime};BASE64` })
    //     })
    //     .then((blob) => {
    //         uploadBlob = blob
    //         return imageRef.put(blob, { contentType: mime })
    //       })
    //       .then(() => {
    //         uploadBlob.close()
    //         return imageRef.getDownloadURL()
    //       })
    //       .then((url) => {
    //         // URL of the image uploaded on Firebase storage
    //         console.log(url);
            
    //       })
    //       .catch((error) => {
    //         console.log(error);
     
    //       })  
     
    //   }

    

    // onChooseImagePress = async () => {
    //     let result = await ImagePicker.launchCameraAsync();
    //     // let result = await ImagePicker.launchImageLibraryAsync();
    
       

    //     if (!result.cancelled) {
    //         console.log(result.uri);
    //       this.uploadImage(result.uri, "test-image")
    //         .then(() => {
    //           alert("Success");
    //         })
    //         .catch((error) => {
    //           alert("sasa",error);
    //         });
    //     }
    //   }   

    //   uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     console.log(imageName);
    //     // var ref = firebase.storage().ref().child("user/" + Math.random().toString().substring(2, 6) + '.jpg');
    //     // return ref.put(blob);
    //     var ref = firebase.storage().ref().child("images/" + imageName);
    //     return ref.put(blob);
    //   }

    // submit = () => {
        // const {phone, designation, service} = this.state;
        // const db = firebase.firestore();

        // if (!phone || !designation) {
        //     swal('Please fill all the fields','',"error");
        // } else {
            
        //     if (designation == "service provider" && !service) {
        //         swal('Please select Service','',"error");
        //     } else {
                
        //         if (designation == "service provider") {
                    
        //             db.collection('users').add({
        //                 phone,
        //             })

        //         } else {
                    
        //         }

            // }

        // }
    // }



{/* <View style={styles.first}>
                        <Text style={styles.text}>Phone:</Text>
                        <TextInput placeholder="Enter Name" onChange={name} value={name} style={styles.input} />
                    </View> */}





    
//     <View>
//     <TouchableOpacity style={styles.btn}>
//         <Text style={styles.btn_text} onPress={this.submit}>Submit</Text>
//     </TouchableOpacity>
// </View>









{/* <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'carpenter'})}>
                            <Image style={styles.img} source={require('../../assets/carpenter.png')} />
                        </TouchableHighlight>
                            <Text style={styles.txt}>Carpenter</Text>
                    </View>
                    <View style={styles.services}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'transport'})}>
                            <Image style={styles.img} source={require('../../assets/driver.png')} />
                        </TouchableHighlight>
                        <Text style={styles.txt}>Transport</Text>
                    </View>
                </View>
                <View style={styles.second}>
                    <View style={styles.services}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'electric'})}>
                            <Image style={styles.img} source={require('../../assets/electric.png')} />
                        </TouchableHighlight>
                        <Text style={styles.txt}>Electrician</Text>
                    </View>
                    <View style={styles.services}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'laundry'})}>
                            <Image style={styles.img} source={require('../../assets/laundry.png')} />
                        </TouchableHighlight>
                        <Text style={styles.txt}>Laundry</Text>
                    </View>
                </View>    
                <View style={styles.third}>
                    <View style={styles.services}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'plumber'})}>
                            <Image style={styles.img} source={require('../../assets/plumber.png')} />
                        </TouchableHighlight>
                        <Text style={styles.txt}>Plumber</Text>
                    </View>
                    <View style={styles.services}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Category',{name: 'cleaning'})}>
                            <Image style={styles.img} source={require('../../assets/clean.png')} />
                        </TouchableHighlight>
                        <Text style={styles.txt}>Cleaning</Text>
                    </View> */}