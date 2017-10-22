let messages = [{
    id: 1,
    senderId: 1,
    receiverId: 2,
    message: {
      date: '1508675073513',
      text: 'Hello my friend!'
    }
  },{
    id: 2,
    senderId: 2,
    receiverId: 1,
    message: {
      date: '1508675102012',
      text: 'Hello, Oleg'
    }
  }
]

let findMsg = id => messages.find(msg => msg.id === id);

let idsTalkWith = id => {
  let ids = [];
  let msgs = messages.filter(msg => msg.senderId === id);
  for (let msg of msgs) {
    if (!ids.includes(msg.receiverId)) {
      ids.push(msg.receiverId);
    }
  }
  return ids
}
module.exports = {messages, idsTalkWith, findMsg}
