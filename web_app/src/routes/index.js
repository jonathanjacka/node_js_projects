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
router.route('/auth/loginSuccess').get(loginSuccess);
router.route('/auth/registerSuccess').get(registerSuccess);
router.route('/auth/profile').get(getUserProfile);
router.route('/session-details/:sessionId').get(isProtected, getSession);
router.route('/').get(isProtected, getAllSessions);

router.use('/', getError);

module.exports = router;
