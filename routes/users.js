const usersRouter = require('express').Router();

const { getUsers, doesUserExist, createUser, updateAvatar, updateProfile } = require('../controllers/users');

// const users = require('../data/users.json');

usersRouter.get('/users', getUsers);

usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', doesUserExist);

usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;