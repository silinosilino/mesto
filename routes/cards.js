const cardsRouter = require('express').Router();

const cards = require('../data/cards.json');

cardsRouter.get('/', (req, res) => {
  res.send(cards);
});

module.exports = cardsRouter;



// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору