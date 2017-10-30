var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require('body-parser');


let messages = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});
app.get('/socket/index.js', (req, res) => {
  res.sendFile(__dirname + '/public/socket/index.js')
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css')
});

// app.get('/socket', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// });
// app.get('/socket/index.js', (req, res) => {
//   res.sendFile(__dirname + '/socket/index.js')
// });

app.get('/messages', (req, res) => res.json(messages));

app.post('/messages', (req, res) => messages.push(req.body));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('chat message', (msg) => {
    messages.push(msg);
    io.emit('chat message', msg);
  });

  socket.emit('chat history', messages);
})

http.listen(3030, () => console.log('Listening on *:3030'));
