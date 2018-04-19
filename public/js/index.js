var socket = io()

socket.on('connect', function() {
    console.log('connected to the server.')


    
})

socket.on('disconnect', function() {
    console.log('disconnected from the server.')
})

socket.on('newMessage', function(data) {
    console.log('New message.', data)
    var li = $('<li></li>')
    li.text(`${data.from}: ${data.text}`)

    $('#message-list').append(li)
})


$('#message-form').on('submit', function(e) {
    e.preventDefault()
    var message = $("[name='message']").val()
    socket.emit('createMessage' ,{
        from: 'user',
        text: message
    }, function() {

    })
    $("[name='message']").val('')
    
})