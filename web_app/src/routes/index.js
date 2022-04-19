const router = require('express').Router();

const { getHomePage, getError, getSession } = require('../controllers');

router.get('/session-details/:sessionId', getSession);

router.get('/', getHomePage);
router.use('/', getError);

module.exports = router;
