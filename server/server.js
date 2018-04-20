const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const { isRealString } = require('./utils/isRealString')
const { Users } = require('./utils/users')

const port = process.env.PORT || 3000


const publicPath = path.join(__dirname , '../public')


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

var users = new Users()


io.on('connection', (socket) => {
    console.log('new user connected.')

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Invalid room or name provided.')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'))

        socket.broadcast.to(params.room).emit('newMessage', generateMessage(params.name, `${params.name} joined`))


        

        
        callback()

    })






    socket.on('createMessage', 
    (newMessage, callback) => {
        var newM = generateMessage(newMessage.from,newMessage.text)
        console.log('Message received', newM)

        io.emit('newMessage',newM)
        callback("sup from server")
        //socket.broadcast.emit('newMessage',newM)
    })

    socket.on('createLocationMessage', (locMessage) => {
        io.emit('newMessage', generateMessage('Admin', `${locMessage.lat}, ${locMessage.long}`))
    })

    socket.on('disconnect', () => {
        console.log('tab is closed. Client disconnected.')

        var socketid = socket.id
        var user = users.getUser(socketid)

        if(user) {
            let roomToLeave = user.room
            users.removeUser(socket.id)
            io.to(roomToLeave).emit('updateUserList', users.getUserList(roomToLeave))
            io.to(roomToLeave).emit('newMessage',generateMessage('Admin', `${user.name} has left.`))
            

        }

        
        
    })

    })



server .listen(port, () => {
    console.log(`Started on port ${port}.`)
})

