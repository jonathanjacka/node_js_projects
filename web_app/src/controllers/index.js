const connectDB = require('../db');
const { ObjectId } = require('mongodb');

/**
 * @desc     Returns /register screen
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

  console.log('SessionID:', sessionID, typeof sessionID);

  console.log('Session: ', session);

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
