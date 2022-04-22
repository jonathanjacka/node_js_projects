const data = require('../models/data');

const connectDB = require('../db');

/**
 * @desc     Get All sessions for home page
 * @route    GET /
 * @access   Public
 */
exports.getAllSessions = async (req, res, next) => {
  const db = await connectDB();
  const sessions = await db.collection('sessions').find().toArray();

  console.log(`Here are our sessions: `, sessions.length);

  res.status(200).render('index', {
    pageTitle: 'Home | Welcome',
    path: '/',
    data,
    hasData: data.length > 0,
    activeHome: true,
  });
};

/**
 * @desc     Get individual session with id
 * @route    GET /session-details/:id
 * @access   Public
 */
exports.getSession = (req, res, next) => {
  const session = getSessionData(req.params.sessionId);
  if (!session) {
    res.redirect(`/error`);
  } else {
    res.status(200).render('session-details', {
      pageTitle: `Session | ${session.name}`,
      path: `/session-details/${session.id}`,
      data: session,
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
const getSessionData = (sessionId) => {
  return data.filter((item) => item.id === +sessionId)[0];
};
