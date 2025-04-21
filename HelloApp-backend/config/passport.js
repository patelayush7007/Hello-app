import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

const TWITTER_CONSUMER_KEY =  process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const CALLBACK_URL = 'http://localhost:5000/api/auth/twitter/callback';

// User serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: CALLBACK_URL,
      includeEmail: true
    },
    (token, tokenSecret, profile, done) => {
      // Here, you can handle finding/creating the user in your DB
      console.log('Twitter profile:', profile);
      console.log("username :" ,profile.username);
      
      return done(null, profile);
    }
  )
);

export default passport;
