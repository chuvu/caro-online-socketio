import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput, Text} from 'react-native';

export default class Form extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder='User Name' style={styles.textInput} />
                <TextInput placeholder='Password' style={styles.textInput} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.btn}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnReg}><Text style={styles.btnText}>Register</Text></TouchableOpacity>
                <Text style={{ textAlign: "center", margin: 15, color: 'white' }}>Fogot Password</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: 'center',
        padding: '10%'
      },
      textInput: {
        width: '100%',
        height: '20%',
        backgroundColor: 'rgba(197, 237, 245, 0.5)',
        borderRadius: 50,
        padding: 10,
        color: 'black',
        fontSize: 20,
        textAlign: "center",
        margin: 15
      },
      btn: {
        width: '100%',
        height: '20%',
        backgroundColor: 'rgba(22, 66, 212, 0.9)',
        borderRadius: 50,
        justifyContent: 'center',
        margin: 15,
        marginBottom: -10
      },
      btnReg: {
        width: '100%',
        height: '20%',
        backgroundColor: 'rgba(139, 22, 212, 0.9)',
        borderRadius: 50,
        justifyContent: 'center',
        margin: 15,
        marginBottom: -10
      },
      btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
      },
})