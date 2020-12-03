import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET_KEY } from './settings';

passport.use(
  new Strategy(
    {
      secretOrKey: JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user_id);
      } catch (error) {
        done(error);
      }
    },
  ),
);