const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const connectDB = require('../../db');
const debug = require('debug')(`app:local-strategy`);

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        debug('local strategy beginning...');
        try {
          const db = await connectDB();
          debug('getting database to check user...');
          const user = await db.collection('users').findOne({ username });
          debug('trying to find user in db...');

          debug(`User: ${user}`);

          if (!user || user.password !== password) {
            done(null, false);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
