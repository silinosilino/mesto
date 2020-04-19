const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { DATABASE_URL, PORT } = require('./config.js');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/not-found-error');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(() => {
  throw new NotFoundError('Page not found');
  // res.status(404).send({ message: 'Page not found' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Server error'
        : message,
    });
  next();
});

app.listen(PORT);
