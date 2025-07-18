
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value.toLowerCase();
      const domain = '@sece.ac.in';

      if (!email.endsWith(domain)) {
        return done(new Error(`Only ${domain} emails allowed`), null);
      }

      try {
        // let user = await User.findOne({ googleId: profile.id });
        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });


        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
