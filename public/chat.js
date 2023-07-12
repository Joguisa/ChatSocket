var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){

    socket.emit('chat', {
        message: message.value,
        user: user.value,
    });

    message.value = '';
});

socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>'+data.user+': </strong>' +data.message+ '</p>';
    feedback.innerHTML = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', user.value);
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>'+data+' typing...</em></p>'
});