const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  console.log(err.stack.red);

  error = new ErrorResponse(error.message, error.statusCode);

  res
    .status(error.statusCode || 500)
    .send(`Something went wrong: ${error.message}`);
};

module.exports = errorHandler;
