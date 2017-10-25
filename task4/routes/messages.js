const router = require('express').Router();
const msgService = require('../services/messages');

router.get('/', (req, res) => {
  msgService.getAllMsg().then((msgs) => {
    res.send(msgs);
  });
});

router.get('/:id', (req, res) => {
  msgService.findMsg(req.params.id).then((msg) => {
    if (!msg) {
      res.status(404).send({"Not found": req.params.id});
    }
    res.send(msg);
  });
});

router.post('/', (req, res) => {
  let msg = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    message: {
      date: Date.now(),
      text: req.body.text
    }
  };
  msgService.saveMsg(msg);
  res.send(msg);
})

router.put('/:id', (req, res) => {
  msgService.findMsg(req.params.id).then((msg) => {
    let updatedMsg = {
      date: Date.now(),
      text: req.body.text
    }
    msgService.updateMsg(msg._id, updatedMsg)
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  msgService.deleteMsg(req.params.id);
  res.sendStatus(200);
})

module.exports = router;
