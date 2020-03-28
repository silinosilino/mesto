const usersRouter = require('express').Router();

const { doesUserExist } = require('../controllers/users');

const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  res.send(users);
});

userRouter.post('/users', createUser);


usersRouter.get('/users/:id', doesUserExist);
module.exports = usersRouter;
