import React, {Component} from 'react';
import { View, Text, YellowBox, Alert, } from 'react-native';
import Dialog from "react-native-dialog"; 
import ChooseRoom from './ChooseRoom';
import GameBoard from './GameBoard';

import io from 'socket.io-client';
const ROW = 13;
const COL = 13;
const X = 'x';
const O = 'o';
const _ = '';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
export default class Home extends Component {  
    state = {
        screen: 'chooseRoom',
        io: io('http://192.168.1.9:3000'), 
        rooms: [],
        data: [],
        currentRoom: -1,
        type: '',
        userName: '',
        currentPlayer: '',
        playerName: this.props.navigation.getParam('playerName'),
        dialogVisible: false
    };
    drawBoard() {
        let newData = [];
        for (let row = 0; row < ROW; row++) {
            let newRow = [];
            for (let col = 0; col < COL; col++) {
                newRow.push({
                    row: row,
                    col: col,
                    value: ""
                });
            }
            newData.push(newRow);
        }
         this.setState({ data: newData });
    }

    renderScreen() {
        let screen = null;
        if(this.state.screen == 'chooseRoom') {
            screen = <ChooseRoom 
                //key={this.state.rooms}
                rooms={this.state.rooms} 
                onClickRoom={(roomIndex, type, playerName) => {this.joinRoom(roomIndex, type, playerName)}}
                playerName={this.state.playerName}
                />
        }
        else if(this.state.screen == 'GameBoard') { 
            screen = <GameBoard 
                data={this.state.data} 
                onClickCell={(row, col) => this.clickCell(row, col)}
                playerName = {this.state.playerName}
                screen = {this.state.screen}
                onOutRoom = {()=> this.outRoom()}
                currentRoom = {this.state.currentRoom}
                currentPlayer = {this.state.currentPlayer}
                
                />
        }
        return screen;
    }

    componentDidMount(){ 
        showDialog = () => {
            this.setState({ dialogVisible: true });
        };
        this.state.io.on('connect', () => { 
            this.state.io.on('roomList', (rooms) => {
                this.setState({rooms: rooms});
            })
            this.state.io.on('joinRoomResult', (data) => {
                if(data.result==true){
                  this.startGame(data.currentRoom, data.type, data.playerName);
                } else {
                  showDialog();
                }
            });
            this.state.io.on('disconnect', () => {
                Alert.alert('Mất kết nối server!');
            })
            this.state.io.on('boardData', (data)=> {
                this.setState({data: data.boardData});
                this.setState({currentPlayer: data.name})
            })
            
        })
    }

    startGame(currentRoom, type, userName){
        this.setState({currentRoom: currentRoom});
        this.setState({type: type});
        this.setState({userName: userName})
       // this.setState({currentPlayer: currentPlayer})
        this.drawBoard();
        this.setState({screen: 'GameBoard'});
    }
    clickCell(row, col) {
        this.state.io.emit('setCell', 
        {
            row: row, 
            col: col,
            roomIndex: this.state.currentRoom,
            type: this.state.type,
            userName: this.state.playerName,
        });
        
    }
    joinRoom(roomIndex, userName){
        this.state.io.emit('joinRoom', {roomIndex: roomIndex, playerName: userName});
    }
    chooseRoomAgain = () => {
        this.setState({ dialogVisible: false });
      };
    outRoom(){
        this.state.io.emit('player-out-room',{currentRoom: this.state.currentRoom, playerName: this.state.currentRoom.playerName});
        this.setState({screen: 'chooseRoom'});
    }
    render(){
        return(
           <>
           <View>{this.renderScreen()}</View>
           <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>Có Biến!!!</Dialog.Title>
                <Dialog.Description>
                    Phòng đã đầy! Xin chọn phòng khác
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={this.chooseRoomAgain}/>
            </Dialog.Container>
            </>
        );
    }
}

