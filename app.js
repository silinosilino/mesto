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

app.use((req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.listen(PORT);
