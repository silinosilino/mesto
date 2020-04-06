const usersRouter = require('express').Router();
const {
  getUsers, doesUserExist, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', doesUserExist);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
