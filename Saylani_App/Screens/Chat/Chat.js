import React, { Component } from "react";
import { Dimensions, TextInput, ScrollView,
    View,
    StyleSheet, Button, AsyncStorage
} from "react-native";
import {Text} from "react-native-elements";
import firebase from 'firebase/app';
import 'firebase/firestore';

const {width,height} = Dimensions.get("window");

class Chat extends Component {

    constructor(props){
        super(props);

        this.state = ({
            message: "",
            mesag:[]
        })
    }

    async componentWillMount(){

        const user = await AsyncStorage.getItem('userToken');
        this.setState({uid: user});

    }

    send(){
        const {message,id1,id2,offid} = this.state;
        // var id1 = this.props.navigation.getParam('id');
        // var id2 = this.props.navigation.getParam("userid");
        var DateNew = new Date();
        var currentTime = DateNew.toLocaleTimeString();
        
        if (id1 && id2) {
            debugger
            
            const db = firebase.firestore();
            
            db.collection("chat").where(`${id1}`,"==",true).where(`${id2}`,"==",true).where("offer","==",offid).onSnapshot(res =>{

                if (res.docs.length) {
                    
                    db.collection("chat").doc(res.docs[0].id).collection("messages").add({
                        message,
                        sender: id1,
                        reciever: id2,
                        Time: currentTime,
                        Date:new Date()
                    }).then(() =>{
                        this.setState({message: ""})
                    })

                } else {
                    
                    db.collection("chat").add({
        
                        [id1]:true,
                        [id2]: true,
                        offer: offid
        
                    }).then(res =>{
        
                        db.collection("chat").doc(res.id).collection("messages").add({
                            message,
                            sender: id1,
                            reciever: id2,
                            Time: currentTime,
                            Date:new Date()
                        }).then(() =>{
                            this.setState({message: ""})
                        })
        
                    })

                }

            })

            
        }
    }
    
    render() {

        const {mesag,uid} = this.state;
        var id1 = this.props.navigation.getParam('id');
        var id2 = this.props.navigation.getParam("userid");
        var offid = this.props.navigation.getParam("offer");
        const db = firebase.firestore();

        if (this.state.id1 != id1 && this.state.id2 != id2) {
debugger
        
            db.collection("chat").where(`${id1}`,"==",true).where(`${id2}`,"==",true).where("offer","==",offid).onSnapshot(res =>{
                if (res.docs.length) {
                    
                    db.collection("chat").doc(res.docs[0].id).collection("messages").orderBy("Date").onSnapshot(ms =>{
                        if (ms.docs.length) {
                            
                            if (mesag.length != ms.docs.length) {
                            this.setState({mesag: []})
                                ms.forEach(msg =>{

                                var a = {sender: msg.data().sender,reciever: msg.data().reciever,message:msg.data().message }
                                

                                    this.setState({
                                        id1,id2,offid,mesag: [...this.state.mesag,a]
                                    })

                                    
                                })
                                
                            }


                        } else {
                            
                            this.setState({
                                id1,id2,offid
                            })

                        }
                    })


                } else {
                    
                    this.setState({
                        id1,id2,offid
                    })

                }
            })
        
    }

        return (
            <View style={styles.container}>
                <View style={styles.chat}>
                    <View style={styles.head}>
                        <Text h2 style={{color: "#fff"}}>Chat</Text>
                    </View>
                    <ScrollView scrollEventThrottle={16}>
                        <View style={styles.message}>

                            {mesag.length > 0 ?
                                <View>
                                    {mesag.map((item, index) =>
                                    <View key={index}>
                                    {uid == item.sender ?

                                        <Text style={styles.msg2}>{item.message}</Text>
                                        :
                                        <Text style={styles.msg1}>{item.message}</Text>
                                    }
                                        </View>

                                    )}
                                </View>
                            :
                            <View></View>
                            }

                        </View>
                    </ScrollView>
                    <View style={styles.input}>
                        <TextInput
                            style={{ height: 40, borderWidth:3 }}
                            placeholder="Type your message!"
                            onChangeText={(message) => this.setState({ message })}
                        />
                        <Button title='Send' onPress={()=>this.send()}/>
                    </View>
                </View>
                <Text></Text>
            </View>
        );
    }
}
export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chat:{
        flex: 1,
        width: width,        
        height: height,
        borderWidth: 2,
        borderColor: "#007bff",
    },
    head:{
        height: 70,
        backgroundColor: "#007bff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    message:{

    },
    input:{
        flex: 1,
        height: 50,
        // borderWidth: 2,
        flexDirection: "column", 
        justifyContent: "flex-end",
        backgroundColor: "#fff"
    },
    msg1:{
        backgroundColor: "rgba(46, 135, 223, 0.45)",
        width: width * .5,
        fontWeight: '400',
        fontSize: 20,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        justifyContent: "flex-start"
        // #80CFE9
    },
    msg2:{
        backgroundColor: "rgba(46, 135, 223, 0.45)",
        width: width * .5,
        fontWeight: '400',
        fontSize: 20,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderTopRightRadius: 0,
        textAlign: 'right',
        alignSelf: 'flex-end',
        // alignItems: 'flex-end'
    }
});