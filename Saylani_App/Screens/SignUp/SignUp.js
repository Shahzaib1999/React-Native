import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';

const provider = new firebase.auth.FacebookAuthProvider();

class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            Name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    }

    render() {

        signUp = () => {

            firebase.auth().signInWithPopup(provider).then(function (result) {
                var user = result.user;
          
              }).catch(err => {
                swal(err.message, '', 'error');
              });

        }
        
        return (
            <View style={styles.container}>

                <View style={styles.first}>
                    <Text style={styles.text}>Name:</Text>
                    <TextInput placeholder="Enter Name" style={styles.input} />
                </View>

                <View style={styles.second}>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput placeholder="Enter Email" style={styles.input} />
                </View>

                <View style={styles.second}>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput placeholder="Enter Password" style={styles.input} secureTextEntry={true} />
                </View>

                <View style={styles.second}>
                    <Text style={styles.text}>Confirm Password:</Text>
                    <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry={true} />
                </View>

                <View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btn_text}>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    first: {
        marginTop: 60,
    },
    second: {
        marginTop: 40,
    },
    text: {
        fontSize: 20
    },
    input: {
        height: 40,
        width: 250,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        // borderRadius: 5,
        fontSize: 20
    },
    btn: {
        width: 120,
        height: 50,
        marginTop: 40,
        borderRadius: 5,
        backgroundColor: '#28a745'
    },
    btn_text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '500',
        alignSelf: 'center'
    }
});