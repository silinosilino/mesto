class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// function notFoundHandler(err, res) {
//   const status = 500 || err.statusCode;
//   res.status(status).send({ message: err.message });
// }

module.exports = { NotFoundError };
