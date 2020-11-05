var io = require('socket.io')(3000);

const ROW = 13;
const COL = 13;
const X = 'X';
const O = 'O';
const _ = '';

var rooms = [];

for(let i = 0; i< 10; i++){
    let newRoom = {
        name: 'Phòng ' + i,
        player: '',
        players: [], 
        data: []
    }

    let newData = [];
    for (let row = 0; row < ROW; row++) {
        let newRow = [];
        for (let col = 0; col < COL; col++) {
            newRow.push({
                row: row,
                col: col,
                value: _,
            });
        }
        newData.push(newRow);
    }
    newRoom.data = newData;
    rooms.push(newRoom);
}
//Ngang
let Horizontal = (mat, c_row, c_col, value) => {// poin.X = c_col; c_row = c_row
    let countLeft = 0;
    let countRight = 0;
    for(let i = c_col; i >= 0; i--){
        if(mat[c_row][i].value === value)
            countLeft++
        else
            break;
    }
    for(let j = c_col +1; j < COL; j++){
        if(mat[c_row][j].value === value)
            countRight++
        else
            break;
    }
    if(countRight+countLeft>=5)
        return 1;
}
//doc
let Vertical = (mat, c_row, c_col, value) => {
    let countTop = 0;
    let countBot = 0;
    for(let i = c_row; i >= 0; i--){
        if(mat[i][c_col].value === value)
            countTop++
        else
            break;
    }
    for(let j = c_row + 1; j < ROW; j++){
        if(mat[j][c_col].value === value)
            countBot++
        else
            break;
    }
    if(countTop+countBot>=5)
        return 1;
}
//cheo 1
let Primary = (mat, c_row, c_col, value) => {// poin.X = c_col; c_row = c_row
    let countTop = 0;
    let countBot = 0;
    for(let i = 0; i <= c_col; i++){
        if(c_col - i < 0 || c_row - i < 0)
            break;
        if(mat[c_row - i][c_col - i].value === value)
            countTop++
        else
            break;
    }
    for(let j = 1; j <= ROW - c_col; j++){
        if (c_row + j >= COL || c_col + j >= ROW)
                break;
        if(mat[c_row + j][c_col + j].value === value)
            countBot++
        else
            break;
    }
    if(countTop+countBot>=5)
        return 1;
}
//cheo 2 : bi loi
let Sub = (mat, c_row, c_col, value) => {// poin.X = c_col; c_row = c_row
    let countTop = 0;
    let countBot = 0;
    for(let i = 0; i <= c_col; i++){
        if(c_col + i > ROW || c_row - i < 0)
            break;
        if(mat[c_row - i][c_col + i].value === value)
            countTop++;
        else
            break;
    }
    for(let j = 1; j <= ROW - c_col; j++){
        if (c_row + j >= COL || c_col - j < 0)
                break;
        if(mat[c_row + j][c_col - j].value === value)
            countBot++;
        else
            break;
    }
    if(countTop+countBot>=5)
        return 1;
}
io.on('connection', (socket) => {
    console.log('Someone connected');
    socket.emit('roomList', rooms);
    socket.on('setCell', (cell) => { // nhan data tu client
        
        rooms[cell.roomIndex].players.forEach((player) => {
        rooms[cell.roomIndex].data[cell.row][cell.col].value = cell.type;
        io.sockets.connected[player.socketId].emit('boardData', {
            boardData: rooms[cell.roomIndex].data,
            name: cell.userName
        }); // gui ve client data cua nguoi choi
       });
       if(Sub(rooms[cell.roomIndex].data, cell.row, cell.col, cell.type) == 1 || Primary(rooms[cell.roomIndex].data, cell.row, cell.col, cell.type) == 1||Horizontal(rooms[cell.roomIndex].data, cell.row, cell.col, cell.type) == 1 || Vertical(rooms[cell.roomIndex].data, cell.row, cell.col, cell.type) == 1){
        socket.broadcast.emit('may-win-roi', {
            playerWin: cell.userName,
            result: true,
        });
        console.log(cell.userName);
    }
       
    });
    socket.on('joinRoom', (data) => {
        let player = rooms[data.roomIndex].players.length;
        if(player == 2){
            socket.emit('joinRoomResult', {result: false});
        }
        else if(player == 0) {
            rooms[data.roomIndex].players.push({
                socketId: socket.id,
                type: X,
                playerName: data.playerName
            });
            socket.emit('joinRoomResult', {
                result: true,
                currentRoom: data.roomIndex,
                type: X,
                userName: socket.id,
                playerName: data.playerName
            });
        } else {
            rooms[data.roomIndex].players.push({
                socketId: socket.id,
                type: O,
                playerName: data.playerName
            });
            socket.emit('joinRoomResult', {
                result: true,
                currentRoom: data.roomIndex,
                type: O,
                userName: socket.id,
                playerName: data.playerName
            });
        }
    });
    socket.on('player-out-room', (data) => {
        rooms[data.currentRoom].players.splice(rooms[data.currentRoom].players.indexOf(data.playerName), 1);
        //rooms[data.currentRoom].data = [];
    });
    socket.on('disconnect', () => {
        console.log('User disconnect');
    });
})