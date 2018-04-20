var socket = io()

function scrollToBottom() {
    var message = $('.rightbar--topview')

    var scrollHeight = message.prop('scrollHeight')
    var scrollTop = message.prop('scrollTop')
    var clientHeight = message.prop('clientHeight')
    var lastMessage = $('#message-list').children('li:last-child');
    var lastMessageHeight = lastMessage.outerHeight(true)
    
    if(scrollTop + clientHeight + lastMessageHeight >= scrollHeight - 100) {
        message.scrollTop(scrollHeight)
    }
}

socket.on('connect', function() {
    console.log('connected to the server.')

    var params = $.deparam(location.search)

    socket.emit('join',params, function(err) {
        if(err) {
            alert(err)
            location.href = '/'
        }
    })


    
})




socket.on('updateUserList', function(users) {
    console.log(users)
})

socket.on('disconnect', function() {
    console.log('disconnected from the server.')
})

socket.on('newMessage', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a')
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        createdAt: formattedTime
    })

    $('#message-list').append(html)
    scrollToBottom()
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

// var locationButton = $('#send-location')
// locationButton.on('click', function() {
//     if(!navigator.geolocation) {
//         return alert('Geolocation not supported by your browser.')
//     }

//     locationButton.attr('disabled', 'disabled').text('Sending Location...')

//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log(position)
//         socket.emit('createLocationMessage',{
//             lat: position.coords.latitude,
//             long: position.coords.longitude
//         })
//         locationButton.removeAttr('disabled').text('Send Location')
//     }, function(err) {
//         locationButton.removeAttr('disabled').text('Send Location')
//         alert(`Unable to fetch location. ${err.code}, ${err.message}`)
//     })
// })