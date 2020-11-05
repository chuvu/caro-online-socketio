import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Slogan from './Slogan';   
export default class ChooseRoom extends Component {
  static navigationOptions = {
  };
  render() {
    return (
      <ImageBackground source={require('../img/bg-login.jpg')} 
      resizeMode='cover' 
      style={{ width: '100%', 
      height: '100%' }}>
        <View style={styles.header}>
          <View style={styles.headerButton}>
              <Image source={require('../img/logo.png')} style={{ 
                  width: 50, 
                  height: 50,}}/>
          </View>
          <View style={styles.headerNoti}>
            <Text style={styles.txt}>Hãy chọn 1 phòng </Text>
          </View>
          <View style={styles.headerButton}>
            <Text style={styles.txtHead, {color: 'yellow', fontWeight: '900'}}>Hello {this.props.playerName}!</Text>
          </View>
        </View>
        <ScrollView style={{flex: 10}}>
        <View style={styles.roomList}>
              <View style={styles.row}>
                {
                  this.props.rooms.map((room, roomIndex) => {
                    return (
                      <TouchableOpacity style={styles.room}
                        key = {room}
                        onPress={() => {
                          this.props.onClickRoom(roomIndex);
                        }}
                        activeOpacity={1}>
                          <Text style={styles.txtRoom}>{room.name}</Text>
                          <Text style={styles.txtPlayer}>... đang có <Text style={{color: 'blue', fontWeight: 'bold'}}>{room.players.length}</Text> người chơi</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
        </View>
        </ScrollView>
        <Slogan/>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  room: {
   margin: 5,
   borderRadius: 5,
   borderWidth: 3,
   borderColor: 'rgba(225, 238, 253, 0.6)',
   backgroundColor: 'rgba(225, 238, 253, 0.6)',
   padding: 5
  },
  row: {
  },
  txtRoom: {
      fontSize: 20
  },
  txtPlayer: {
    textAlign: "right",
    fontStyle: 'italic'
  },
  header: {
    backgroundColor: 'rgba(89, 20, 240, 0.7)',
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row',
    //flex: 1,
    justifyContent: 'flex-end'
},
headerButton: {
    color:'#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
headerNoti: {
    width: 50,
    color:'#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
txt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
}
})