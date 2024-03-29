const passport = require("../middleware/passport");
const userModel = require("../models/userModel")

let authController = {
  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res) => {
    let profile = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    // adds the user to the user and reminder databases
    // maybe add a try?? and show an alert or something if it fails?
    userModel.userModel.createNewUser(profile, "default")

    res.redirect("/login")
  },

  login: (req, res) => {
    res.render("auth/login");
  },

  loginSubmit: 
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",}
  ),

  githubLogin:
    passport.authenticate('github', { 
    scope: [ 'user:email' ] 
    }),

  logout: (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }});
    res.redirect("/login");
  },

  dashboard: (req, res) => {
    res.render("auth/dashboard", {
      user: req.user,
    });
  },

  admin: (req, res) => {
    all_sessions = [];
    for (session in req.sessionStore.sessions){
      sessionID = session
      userID = JSON.parse(req.sessionStore.sessions[session])["passport"]["user"]
      all_sessions.push( { sessionID, userID } )
    }

    res.render("auth/admin", {
      user: req.user,
      allSessions: all_sessions // list of all sessions, but only the session id, user id, and revoke button
    });
  },

  revoke: (req, res) => {
    sessionToDelete = req.params.id;

    // removes that session from sessionStore
    req.sessionStore.destroy(sessionToDelete, err => {
      if (err)
      {
        console.log(err)
      }
    });

    // redirect to /admin to see results
    res.redirect("/admin");
  },

};

module.exports = authController;
