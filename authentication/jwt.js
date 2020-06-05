const passport = require("passport");
const passportJwt = require("passport-jwt");
const config = require("../config");
const users = require("../users");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: config.get("authentication.token.secret"),
  issuer: config.get("authentication.token.issuer"),
  audience: config.get("authentication.token.audience"),
};

passport.use(
  new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    const user = await users.getUserById(parseInt(payload.sub));
    console.log("passport.user - user");
    console.log(user);
    if (user != null) {
      return done(null, user, payload);
    } else {
      return done();
    }
  })
);
