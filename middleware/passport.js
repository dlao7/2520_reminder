const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controller/user_controller");
const userModel = require("../models/userModel")
const devID = require("../devIDs")

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const githubLogin = new GitHubStrategy(
  {
    clientID: devID.clientID,
    clientSecret: devID.clientSecret,
    callbackURL: "http://127.0.0.1:3001/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => { 
    const user = userController.getUserBySocialId(profile.provider, profile.id);

    if (user){
      return done(null, user);
    } else {
      let userEntry = userModel.userModel.createNewUser(profile, "social");
      
      return done(null, userEntry);
    }
    
})
;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin), passport.use(githubLogin);
