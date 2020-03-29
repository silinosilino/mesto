const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

// const cards = require('../data/cards.json');

cardsRouter.get('/cards', getCards);


cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardsRouter;



// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору