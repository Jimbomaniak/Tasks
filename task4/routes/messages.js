const router = require('express').Router();
const msgService = require('../services/messages');

router.get('/', (req, res) => res.send(msgService.messages));

router.post('/', (req, res) => {
  let msg = {
    id: Date.now(),
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    message: {
      date: Date.now(),
      text: req.body.text
    }
  };
  msgService.messages.push(msg);
  res.send(msg);
})

router.put('/:id', (req, res) => {
  let message = msgService.findMsg(Number(req.params.id));
  message.message.text = req.body.text;
  res.sendStatus(200);
})

router.delete('/:id', (req, res) => {
  msgService.messages = msgService.messages.filter(msg =>
  msg.id !== Number(req.params.id));
  res.sendStatus(200);
})

module.exports = router;
