import React, { Component } from 'react';
import {Image, StyleSheet, View} from 'react-native';
import img from '../img/logo.png';
export default class Background extends Component{
    render(){
        return(
            <View style={styles.top}>
                <Image source={img} style={{width: 150, height: 150, marginTop: 180}}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    img: {
        flex: 1, 
        //width: '60%', 
        //height: '30%'
    }
})