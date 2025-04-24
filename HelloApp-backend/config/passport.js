import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../models/user.model.js'

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const CALLBACK_URL = 'http://localhost:5000/api/auth/twitter/callback';

// User serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: TWITTER_CONSUMER_KEY,
//       consumerSecret: TWITTER_CONSUMER_SECRET,
//       callbackURL: CALLBACK_URL,
//       includeEmail: true
//     },
//     async (token, tokenSecret, profile, done) => {
//       try {
//         const { id, username, displayName, photos } = profile;

//         // Find existing user by Twitter ID
//         let user = await User.findOne({ twitterId: id });

//         // If not found, create a new user
//         if (!user) {
//           user = new User({
//             twitterId: id,
//             username,
//             displayName,
//             profileImage: photos?.[0]?.value || null,
//           });
//           await user.save();
//         }

//         // Continue with authenticated user
//         return done(null, user);
//       } catch (err) {
//         console.error('Error during Twitter login:', err);
//         return done(err, null);
//       }
//     }
//   )
// );
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: CALLBACK_URL,
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const { id, username, displayName, photos } = profile;

        let user = await User.findOne({ twitterId: id });

        if (!user) {
          user = new User({
            twitterId: id,
            username,
            displayName,
            profileImage: photos?.[0]?.value || null,
          });
          await user.save();  
          console.log('New user saved:', user);
        } else {
          console.log('User already exists:', user);
        }

        return done(null, user);
      } catch (err) {
        console.error('Error during Twitter login:', err);
        return done(err, null);
      }
    }
  )
);
export default passport;
