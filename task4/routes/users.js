const router = require('express').Router();
const userService = require('../services/users');
const messages = require('../services/messages');

router.get('/', (req, res) => res.send(userService.users));

router.get('/talked/:id', (req, res) => {
  let user = userService.findUser(Number(req.params.id));
  if (user) {
    let ids = messages.idsTalkWith(user.id);
    if (!ids.length) {
      res.send('No receiver users yet');
    } else {
      res.send(userService.getUsersById(ids));
    }
  } else {
    res.sendStatus(400)
  }
})

router.post('/', (req, res) => {
  let user = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  };
  userService.users.push(user);
  res.send(user);
})

router.put('/:id', (req, res) => {
  let user = userService.findUser(Number(req.params.id));
  user.name = req.body.name;
  user.email = req.body.email;
  res.sendStatus(200);
})

router.delete('/:id', (req, res) => {
  userService.users = userService.users.filter(user =>
  user.id !== Number(req.params.id));
  res.sendStatus(200);
})

module.exports = router;
