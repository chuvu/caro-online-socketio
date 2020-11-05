import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Background from '../screen/Background';
import Logo from '../screen/Logo';


export default class Login extends Component {
  state = {
    playerName: '',
  }
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <Background>
          <Logo />
          <View style={styles.container2}>
            <TextInput 
              placeholder='Nhập tên của bạn ....' 
              style={styles.textInput}
              onChangeText={(text) => this.setState({playerName: text})}
            />
            <TouchableOpacity onPress={() => {
              if(this.state.playerName != '')this.props.navigation.navigate('Home',{playerName: this.state.playerName})
              else Alert.alert('Hãy nhập tên của bạn');
            }} style={styles.btn}>
              <Text style={styles.btnText}>VÀO!!</Text>
              </TouchableOpacity>
          </View>
        </Background>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
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