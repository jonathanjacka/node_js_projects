const router = require('express').Router();
const debug = require('debug')('app:router');

const mongodb = require('mongodb');

const {
  getHomePage,
  getRegister,
  getLogin,
  userLogin,
  userRegister,
  getError,
  getSession,
  getAllSessions,
} = require('../controllers');

router.route('/register').get(getRegister);
router.route('/login').get(getLogin);
router.route('/auth/login').post(userLogin);
router.route('/auth/register').post(userRegister);
router.route('/session-details/:sessionId').get(getSession);
router.route('/').get(getAllSessions);

router.use('/', getError);

module.exports = router;
