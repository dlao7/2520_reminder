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

  loginSubmit:
    passport.authenticate("local", {
      successRedirect: "dashboard",
      failureRedirect: "login",
    }),

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
