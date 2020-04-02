const Card = require('../models/card');

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
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((item) => res.status(202).send({ data: item }))
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        res.status(404).send({ message: 'This card belongs to another user' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send({ message: err.message }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send({ message: err.message }));
