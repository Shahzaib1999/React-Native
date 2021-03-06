import * as React from 'react';
import { Text, View, StyleSheet,Dimensions} from 'react-native';
import {MapView} from 'expo';

const {width,height} = Dimensions.get("window");

export default class Maap extends React.Component {

state ={
  latitude:24.0000000,
  longitude:66.0000000,
  condition:false
}



_getLocationAsync = async () => {

    //++++ this is use for getting current location if you are not save in anyncStorage....

    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Expo.Location.getCurrentPositionAsync({});
    var lat = this.props.navigation.getParam('lat');
    var lon = this.props.navigation.getParam('lon');
    this.setState({ location ,condition:true, lat, lon });
    console.log('current location===',location)


    //+++this is data for giting priviously save current location of the user ..

    // await AsyncStorage.getItem('userLocation')
    // .then(req => JSON.parse(req)) 
    // .then(location => {console.log('geting location');this.setState({location,condition:true})})
    // .catch(error => console.log('error!'));
    
  }; 

  

 


componentDidMount(){
  this._getLocationAsync()
}

  render() {
 
    var lat = this.props.navigation.getParam('lat');
    var lon = this.props.navigation.getParam('lon');
    
    if (lat != this.state.lat || lon != this.state.lon) {
        this._getLocationAsync()
    }

    return (
      <View style={styles.container}>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>your app Logo or etc</Text>
      </View> */}
       {this.state.condition && <MapView 
        style={{flex: 2, height: height, width: width}}
        initialRegion={{
          latitude:this.state.location.coords.latitude,
          longitude:this.state.location.coords.longitude,
          latitudeDelta: 0.0922 ,
          longitudeDelta: 0.0421 ,
        }}
        >

        <MapView.Marker
        coordinate={this.state.location.coords}
        title={'Your Location'}
        pinColor={'black'}
        />


        {/* here you pput the latitude and longitude of services provider */}
        {this.state.lat &&
        <MapView.Marker
        coordinate={{latitude:this.state.lat,longitude:this.state.lon}}
        title={'service provider'}
        />
        }
        </MapView>
    }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});