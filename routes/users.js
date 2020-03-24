const usersRouter = require('express').Router();

const users = require('../data/users.json');

usersRouter.get('/', (req, res) => {
  res.send(users);
});

const doesUserExist = (req, res) => {
  /* eslint-disable-next-line no-underscore-dangle */
  const user = users.find((elem) => elem._id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
};

usersRouter.get('/:id', doesUserExist);
module.exports = usersRouter;
