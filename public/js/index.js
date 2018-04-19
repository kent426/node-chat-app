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
        $("[name='message']").val('')
    })
    
    
})

var locationButton = $('#send-location')
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...')

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
        locationButton.removeAttr('disabled').text('Send Location')
    }, function(err) {
        locationButton.removeAttr('disabled').text('Send Location')
        alert(`Unable to fetch location. ${err.code}, ${err.message}`)
    })
})