const passport = require('passport');
const bcrypt = require('bcrypt');
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

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!user || !passwordMatch) {
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
