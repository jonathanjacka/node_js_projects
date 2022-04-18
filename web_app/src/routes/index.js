const router = require('express').Router();

const { getHomePage, getError } = require('../controllers');

router.get('/', getHomePage);
router.use('/', getError);

module.exports = router;
