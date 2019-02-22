import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Alert} from "react-native";
import * as firebase from 'firebase';
import Loader from "../Loader/Loader";



class Welcome extends Component {

    constructor(props){
        super(props);

        this.state = ({
            loading: false,
            user: null
        });
    }

    componentWillMount() {



        // alert(this.state.uid);

        // firebase.auth().onAuthStateChanged(user => {
        //   if (user) {
        //       alert('Logged In');
        //     this.setState({ user: true, uid: user.uid });
        //     localStorage.setItem('uid', user.uid);
        //     //this.setPosition();
        //   } else {
        //     //alert('not Logeed In');
        //     this.setState({ user: false });
        //   }
        // });
    
      }
    
    logIn = async() => {
        this.setState({loading: true})
        try {
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Expo.Facebook.logInWithReadPermissionsAsync('378549486258643', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            var aid = await response.json().then((uid) => {
                // console.log(uid.id);
                this.setState({uid: uid.id});
                this.toke();
            })

            // Alert.alert('Logged in!', `Hi ${(await response.json()).id}!`); 

                
        } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

      toke = async () =>{
            const token = await AsyncStorage.setItem('userToken',`${this.state.uid}`).then(() =>{
                this.props.navigation.navigate('App');
            });
            // alert(this.state.uid);
      }

    render() {
        const {user, loading} = this.state;
        return (
            <View style={styles.container_fluid}>
            {!loading ?
                <View>
                    <View style={styles.head}>
                        <Image style={{ width: 180, height: 180 }} source={require('../../assets/logo1.png')} />
                        <Text style={styles.heading}>SMITFYP</Text>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btn_text} onPress={this.logIn.bind(this)}>Log In with Facebook</Text>
                        </TouchableOpacity>
                    {/* {user ? <Text>{uid}</Text> : <Text>Out</Text>} */}
                        {/* <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: '#0E97D6', borderRadius: 5 }}>
                            <Text style={styles.btn_text} onPress={() => this.props.navigation.navigate('SignIn')}>SignIn</Text>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: '#0E97D6', borderRadius: 5, marginTop: 10 }}>
                            <Text style={styles.btn_text} onPress={() => this.props.navigation.navigate('SignUp')}>SignUp</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
                :
                <Loader />
            }
            </View>
        );
    }
}
export default Welcome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_fluid: {
      flex: 1,
      alignItems: 'center'
    },
    head:{
      marginTop: 30,
      alignItems: 'center'
    },
    heading:{
      fontSize: 43,
      fontWeight: '600',
      color: 'darkred',
    },
    btn_text:{
        color: '#fff', 
        fontSize: 30, 
        fontWeight: '500', 
        alignSelf: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 320,
        color: '#fff',
        fontSize: 24,
        borderRadius: 50,
        fontWeight: '600',
        backgroundColor: '#14629D',
    }
  });