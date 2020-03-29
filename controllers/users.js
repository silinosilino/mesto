const User = require('../models/user');

const users = require('../data/users.json');

module.exports.doesUserExist = (req, res) => {
  User.findById(req.params.id)
        .then(user => res.send({ data: user }))
        .catch(err => res.status(404).send({ message: 'Нет пользователя с таким id' }));
}


module.exports.createUser = (req, res) => {
  console.log("hello");
  console.log(req.body);
  const { name, about, avatar } = req.body;
  console.log(name, about, avatar);

  User.create({ name, about, avatar })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

//   const user = users.find((elem) => elem._id === req.params.id);
//   if (!user) {
//     res.status(404).send({ message: 'Нет пользователя с таким id' });
//     return;
//   }
//   res.send(user);
// };