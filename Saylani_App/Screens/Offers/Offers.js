import React, { Component } from "react";
import { ScrollView, AsyncStorage, Dimensions,
    View,
    StyleSheet
} from "react-native";
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loader from "../Loader/Loader";
import {Text} from 'react-native-elements';

const {width} = Dimensions.get('window');

class Offers extends Component {

    constructor(props){
        super(props)

        this.state = ({
            loading:  true,
            sentOffers: [],
            sent: null,
            recivedoffers : [],
            recieve: null
        })
    }

    async componentWillMount(){

        const user = await AsyncStorage.getItem('userToken');
        this.setState({uid: user});
        // console.log(user);

    }

     Recivedoffer = () =>{

        // const user = await AsyncStorage.getItem('userToken');
        // this.setState({uid: user});
        const {uid, recivedoffers, recieve} = this.state;
        console.log(uid);
        const db = firebase.firestore();

        if (uid) {
            
        
        db.collection("offers").where("reciever","==",uid).get().then(res =>{

            if (res.docs.length) {
                
console.log("//////////////////////////////");


            } else {
                
                this.setState({loading: false, recieve: "No received data found", recivedoffers: []});

            }

        })
    }

        return(
            <View>
                {recivedoffers.length ? 
                <View style={styles.container}>
                    
                </View>
                :
                <View style={styles.container}>
                    <Text>{recieve}</Text>
                </View>
                }
            </View>
        )

    }

    Sentoffer = () =>{

        const {uid, sentOffers, sent} = this.state;
        const db = firebase.firestore();

        // db.collection("offers").where("sender","==",uid).get().then(res =>{

        //     if (res.docs.length) {
                


        //     } else {
                
        //         this.setState({loading: false, recieve: "No sent data found", sentOffers: []});

        //     }

        // })

        return(
            <View>
                {/* {sentOffers.length ? 
                <View style={styles.container}>

                </View>
                :
                <View style={styles.container}>
                    <Text>{sent}</Text>
                </View>
                } */}
            </View>
        )

    }

    render() {
        const {loading} = this.state;

        return (
            <View style={styles.container}>
            <ScrollView scrollEventThrottle={16}>
                {loading ? 
                    <View>
                        <View style={styles.recived}>
                            <Text h2>Recieved</Text>
                            {this.Recivedoffer()}
                        </View>
                        <View style={styles.sent}>
                            <Text h2>Sent</Text>
                            {/* {this.Sentoffer()} */}
                        </View>

                    </View>
                :
                <Loader />
                }           
            </ScrollView>         
            </View>
        );
    }
}
export default Offers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    recived:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sent:{
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,
    }
});