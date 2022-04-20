const router = require('express').Router();
const debug = require('debug')('app:router');

const mongodb = require('mongodb');

const { getHomePage, getError, getSession } = require('../controllers');

router.route('/session-details/:sessionId').get(getSession);
router.route('/').get(getHomePage);

router.use('/', getError);

module.exports = router;
