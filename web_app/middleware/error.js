const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  debug(err.stack.red);

  res
    .status(error.statusCode || 500)
    .send(`Something went wrong: ${error.statusCode}`);
};

module.exports = errorHandler;
