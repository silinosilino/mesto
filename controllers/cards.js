const Card = require('../models/card');
const { NotFoundError, notFoundHandler } = require('../errors/not-found-error');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId).orFail(() => new NotFoundError())
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((item) => res.status(200).send({ data: item }))
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        res.status(403).send({ message: 'This card belongs to another user' });
      }
    })
    .catch((err) => notFoundHandler(err, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).orFail(() => new NotFoundError())
  .populate(['owner', 'likes'])
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => notFoundHandler(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).orFail(() => new NotFoundError())
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => notFoundHandler(err, res));
