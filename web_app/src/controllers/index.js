const connectDB = require('../db');
const { ObjectId } = require('mongodb');

/**
 * @desc     Returns register screen for user sign up
 * @route    GET /register
 * @access   Public
 */
exports.getRegister = (req, res, next) => {
  res.status(200).render('register', {
    pageTitle: 'Home | Register',
    path: '/register',
    activeRegister: true,
  });
};

/**
 * @desc     Returns login screen
 * @route    GET /login
 * @access   Public
 */
exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    pageTitle: 'Home | Login',
    path: '/login',
    activeLogin: true,
  });
};

/**
 * @desc     Handles user login
 * @route    POST /auth/login
 * @access   Private
 */
exports.handleLogin = (req, res, next) => {
  console.log('Logging in:', req.body);
  req.login(req.body, () => res.redirect('/auth/loginSuccess'));
};

/**
 * @desc     Handles user login SUCCESS
 * @route    POST /auth/loginSuccess
 * @access   Private
 */
exports.loginSuccess = (req, res, next) => {
  console.log('Successful login!');
  res.redirect('/auth/profile');
};

/**
 * @desc     Handles user registration
 * @route    POST /auth/registration
 * @access   Private
 */
exports.handleRegister = async (req, res, next) => {
  console.log('User registering...', req.body);

  //Create user
  const { name, username, email, password } = req.body;
  const newUser = { name, username, email, password };

  const db = await connectDB();
  const results = await db.collection('users').insertOne(newUser);
  req.login(results.insertedId, () => res.redirect('/auth/registerSuccess'));
};

/**
 * @desc     Handles user register SUCCESS
 * @route    POST /auth/registerSuccess
 * @access   Private
 */
exports.registerSuccess = (req, res, next) => {
  console.log('Successful Registration!');
  res.redirect('/auth/profile');
};

/**
 * @desc     gets logged in user profile
 * @route    GET /auth/profile
 * @access   Private
 */
exports.getUserProfile = (req, res, next) => {
  console.log('User: ', req.user);
  const user = req.user;
  if (!user) {
    res.redirect('/login');
  }
  res.status(200).render('profile', {
    pageTitle: 'Home | Logged In',
    path: '/auth/profile',
    activeLogin: true,
    user,
  });
};

/**
 * @desc     Get All sessions for home page
 * @route    GET /
 * @access   Public
 */
exports.getAllSessions = async (req, res, next) => {
  const db = await connectDB();
  const sessions = await db.collection('sessions').find().toArray();

  res.status(200).render('index', {
    pageTitle: 'Home | Welcome',
    path: '/',
    sessions: sessions.map((session) => {
      return {
        ...session,
        description: getShortDescription(session.description),
      };
    }),
    hasData: sessions.length > 0,
    activeHome: true,
  });
};

/**
 * @desc     Get individual session with id
 * @route    GET /session-details/:id
 * @access   Public
 */
exports.getSession = async (req, res, next) => {
  const sessionID = req.params.sessionId;
  const session = await getSingleSessionData(sessionID);

  if (!session) {
    res.redirect(`/error`);
  } else {
    res.status(200).render('session-details', {
      pageTitle: `Session | ${session.title}`,
      path: `/session-details/${session.id}`,
      session,
    });
  }
};

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

/* Util functions */
const getSingleSessionData = async (sessionId) => {
  const db = await connectDB();
  const session = await db
    .collection('sessions')
    .findOne({ _id: new ObjectId(sessionId) });
  return session;
};

const getShortDescription = (description) => {
  description = description.split(' ');

  if (description.length > 30) {
    description = description.slice(0, 30);
    description[description.length - 1] = '...';
  }

  description = description.join(' ');

  return description;
};
