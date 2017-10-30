(function () {
  let userHeader = document.getElementById('userHeader')
  let nameButton = document.getElementById('nameButton')
  let nameInput = document.getElementById('nameInput')
  let messages = document.getElementById('messages')
  let text = document.getElementById('text')
  let textSubmit = document.getElementById('textSubmit')

  let userName = 'User name';
  userHeader.innerText = userName;

  const socket = io.connect();

  nameButton.onclick = () => {
    userName = nameInput.value || 'User name';
    userHeader.innerText = userName;
  };

  textSubmit.onclick = () => {
    let data = {
      name: userName,
      text: text.value
    };
    text.value = '';
    socket.emit('chat message', data);
  };

  socket.on('chat history', (msg) => {
    messages.innerHTML = '';
    for(let i in msg) {
      if(msg.hasOwnProperty(i)) {
        let el = document.createElement('li');
        el.innerText = msg[i].name + ': ' + msg[i].text;
        messages.appendChild(el);
      }
  }
});

socket.on('chat message', (msg) => {
  let el = document.createElement('li');
  el.innerText = msg.name + ': ' + msg.text;
  messages.appendChild(el);
})

})();
