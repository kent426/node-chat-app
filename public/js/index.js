var socket = io()

socket.on('connect', function() {
    console.log('connected to the server.')

    socket.emit('createMessage', {
        from:'kent@example.com',
        text: 'this is kent sending the message.'
    })

    
})

socket.on('disconnect', function() {
    console.log('disconnected from the server.')
})

socket.on('newMessage', function(data) {
    console.log('New message.', data)
})