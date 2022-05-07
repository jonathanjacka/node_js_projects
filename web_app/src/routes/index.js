const router = require('express').Router();
const debug = require('debug')('app:router');

const {
  getHomePage,
  isProtected,
  getRegister,
  getLogin,
  handleLogin,
  loginSuccess,
  handleRegister,
  registerSuccess,
  getUserProfile,
  getError,
  getSession,
  getAllSessions,
} = require('../controllers');

router.route('/register').get(getRegister);
router.route('/login').get(getLogin);
router.route('/auth/login').post(handleLogin);
router.route('/auth/register').post(handleRegister);
router.route('/auth/loginSuccess').get(isProtected, loginSuccess);
router.route('/auth/registerSuccess').get(isProtected, registerSuccess);
router.route('/auth/profile').get(isProtected, getUserProfile);
router.route('/sessions/:sessionId').get(isProtected, getSession);
router.route('/sessions').get(isProtected, getAllSessions);
router.route('/').get(getHomePage);

router.use('/', getError);

module.exports = router;
