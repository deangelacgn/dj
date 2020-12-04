import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtSecretKey } from '../settings';

passport.use(
  new Strategy(
    {
      secretOrKey: jwtSecretKey,
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

export const jwtGuard = () => passport.authenticate('jwt', { session: false });