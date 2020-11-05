import React, { Component } from 'react';
import {ImageBackground} from 'react-native';
import img from '../img/bg-login.jpg';
export default class Background extends Component{
    render(){
        return(
            <ImageBackground source={img} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                {this.props.children}
            </ImageBackground>
        );
    }
}