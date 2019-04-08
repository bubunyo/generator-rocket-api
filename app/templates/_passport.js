import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import constants from './constants';
import User from '../modules/user/user.model';

export const setupPassport = (app) => {
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
  };
  const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

  passport.use(jwtStrategy);

  app.use(passport.initialize());
};

export const authJwt = passport.authenticate('jwt', { session: false });
