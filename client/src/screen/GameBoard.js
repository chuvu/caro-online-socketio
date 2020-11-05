import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import io from 'socket.io-client';
import Dialog from "react-native-dialog";   
import Slogan from './Slogan';   
import Backround from '../img/gg.jpg';
export default class GameBoard extends Component { 
     state = {
         io: io('http://192.168.1.9:3000'), 
         playerWin: '',
         disabled: false,
         dialogVisible: false,
    }
    closeDialog = () => {
        this.setState({ dialogVisible: false });
    };
    textColor(value) {
        if(value == 'X'){
            return(
            <Text style={{color: 'red', fontWeight:'bold'}}>{value}</Text>
            )
        }
        return <Text style={{color: 'blue', fontWeight:'bold'}}>{value}</Text>
    }
    componentDidMount(){
        showDialog = () => {
            this.setState({ dialogVisible: true });
        };
        this.state.io.on('may-win-roi', (data) => {
            this.setState({playerWin: data.playerWin, disabled: true});
            showDialog();
        });
        
        
    }
    
    render() {
        return (            
            <View>
                <ImageBackground style={styles.container} source={require('../img/gg.jpg')} 
                    resizeMode='cover' style={{ 
                    width: '100%', 
                    height: '100%',}}>
                    <View style={styles.header}>
                        <View style={styles.headerButton}>
                            <Image source={require('../img/logo.png')} style={{ 
                                width: 50, 
                                height: 50,}}/>
                        </View>
                        <View style={styles.headerNoti}>
                            <Text style={styles.txt}>Phòng.{this.props.currentRoom}</Text>
                            <Text style={styles.txt}> {this.props.currentPlayer == this.props.playerName?'Chờ đối thủ': 'Đến lượt bạn'} </Text>
                        </View>
                        <View style={styles.headerButton}>
                            <TouchableOpacity
                                onPress = {() => {
                                    this.props.onOutRoom();
                            }}>
                                <Image source={require('../img/exit.png')} style={{ 
                                    width: 50, 
                                    height: 50,}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.boar}>
                        {this.props.data.map((rowData, rowIndex) => {
                            return (
                                <View style={styles.row}>
                                    {
                                        rowData.map((cell, colIndex) => {
                                            return (
                                                <TouchableOpacity style={styles.col}
                                                    disabled={this.state.disabled}
                                                    onPress={() => {
                                                        if(this.props.currentPlayer != this.props.playerName){
                                                            this.props.onClickCell(rowIndex, colIndex);
                                                        }else{
                                                            console.log('Chưa đến lượt bạn')
                                                        }
                                                    }}
                                                    
                                                    activeOpacity={1}>
                                                    {this.textColor(cell.value)}
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })}
                    </View>
                    <Slogan/>
                    

                    <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Người chơi {this.state.playerWin} đã thắng!</Dialog.Title>
                    <Dialog.Description>
                        End game :)
                    </Dialog.Description>
                    <Dialog.Button label="OK" onPress={this.closeDialog} />
                    </Dialog.Container>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        padding: 200
    },
    boar: {
       //aspectRatio: 1,
        borderColor: 'rgba(225, 238, 253, 0.6)',
        backgroundColor: 'rgba(225, 238, 253, 0.4)',
        flex: 9
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    col: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(225, 238, 253, 0.6)',
    },
    header: {
        backgroundColor: 'rgba(89, 20, 240, 0.7)',
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        flex: 1,
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
        fontWeight: '900'
    }
})
