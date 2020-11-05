import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';
export default class Slogan extends Component{
    render(){
        return(
            <Text style={styles.slogan}>5 IN LINE TO WIN</Text>
        );
    }
}

const styles = StyleSheet.create({
    slogan: {
        backgroundColor: 'rgba(89, 20, 240, 0.7)',
        color: '#fff',
        padding: 25,
        justifyContent: "center",
        alignItems: 'center',
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 2,
    }
})