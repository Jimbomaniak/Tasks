const router = require('express').Router();
const userService = require('../services/users');
const messages = require('../services/messages');


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
  });
});


router.post('/', (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email
  };
  userService.addUser(user);
  res.send(user);
  })


// router.put('/:id', (req, res) => {
//   let user = userService.findUser(Number(req.params.id));
//   user.name = req.body.name;
//   user.email = req.body.email;
//   res.sendStatus(200);
// })

router.delete('/:id', (req, res) => {
  userService.deleteUser(req.params.id);
  return res.sendStatus(200)
});

module.exports = router;
