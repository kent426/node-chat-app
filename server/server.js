const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')

const port = process.env.PORT || 3000


const publicPath = path.join(__dirname , '../public')


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user connected.')

    socket.emit('newMessage', generateMessage('admin','Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('new user', 'new user joined'))




    socket.on('createMessage', 
    (newMessage, callback) => {
        var newM = generateMessage(newMessage.from,newMessage.text)
        console.log('Message received', newM)

        io.emit('newMessage',newM)
        callback("sup from server")
        //socket.broadcast.emit('newMessage',newM)
    })

    socket.on('disconnect', () => {
        console.log('tab is closed. Client disconnected.')
    })

    })

server .listen(port, () => {
    console.log(`Started on port ${port}.`)
})

