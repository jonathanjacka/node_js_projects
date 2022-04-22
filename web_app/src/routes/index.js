const router = require('express').Router();
const debug = require('debug')('app:router');

const mongodb = require('mongodb');

const {
  getHomePage,
  getError,
  getSession,
  getAllSessions,
} = require('../controllers');

router.route('/session-details/:sessionId').get(getSession);
router.route('/').get(getAllSessions);

router.use('/', getError);

module.exports = router;
