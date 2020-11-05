import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Form from './src/screen/Form';
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import GameBoard from './src/screen/GameBoard';
import ChooseRoom from './src/screen/ChooseRoom';

const RootStack = createStackNavigator(
  {
    Form: Form,
    Home: Home,
    Login: Login,
    GameBoard: GameBoard,
    ChooseRoom: ChooseRoom,
  },
  {
    initialRouteName: 'Login',
    header: null,
    headerMode: 'none'
    
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

