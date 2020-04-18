class NotFoundError extends Error {
  constructor() {
    super('Not found');
    this.statusCode = 404;
  }
}

function notFoundHandler(err, res) {
  let status = 500;
  if (err instanceof NotFoundError) {
    status = err.statusCode;
  }
  res.status(status).send({ message: err.message });
}

module.exports = { NotFoundError, notFoundHandler };
