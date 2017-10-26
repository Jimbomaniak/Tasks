const router = require('express').Router();
const userService = require('../services/users');


router.get('/', (req, res) => {
  userService.getAllUsers()
  .then((users) => {
    res.send(users);
    });
  });


router.get('/:id', (req, res) => {
  userService.findUser(req.params.id)
  .then((user) => {
    if (!user) {
      res.status(404).send({"Not found": req.params.id});
    }
    res.send(user)
  })
});

router.get('/talked/:id', (req, res) => {
  userService.getTalkedWith(req.params.id)
  .then((users) => res.send(users))
  })



router.post('/', (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email
  };
  userService.addUser(user);
  res.send(user);
});



router.delete('/:id', (req, res) => {
  userService.deleteUser(req.params.id);
  return res.sendStatus(200)
});

module.exports = router;
