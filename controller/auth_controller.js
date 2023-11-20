let database = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
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

  loginSubmit:
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
    }),

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
