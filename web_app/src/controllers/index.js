const data = require('../models/data');

/**
 * @desc     Get home page
 * @route    GET /
 * @access   Public
 */
exports.getHomePage = (req, res, next) => {
  res.status(200).render('index', {
    pageTitle: 'Home | Welcome',
    path: '/',
    data,
    hasData: data.length > 0,
    activeHome: true,
  });
};

/**
 * @desc     Returns 404 on bad route request
 * @route    GET /{all errors}
 * @access   Public
 */
exports.getError = (req, res, next) => {
  res.status(404).render('error', { pageTitle: 'Error' });
};
