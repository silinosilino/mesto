const usersRouter = require('express').Router();
const {
  getUsers, doesUserExist, updateAvatar, updateProfile,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', doesUserExist);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
