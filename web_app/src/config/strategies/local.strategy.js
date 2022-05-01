const passport = require('passport');
const { Strategy } = require('passport-local');
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
        try {
          const db = await connectDB();
          const user = await db.collection('users').findOne({ username });

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
