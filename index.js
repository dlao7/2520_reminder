const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated } = require("./middleware/checkAuth");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
// Reminders
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Register or Login
app.get("/register", authController.register);
app.get("/login", authController.login);
app.get("/dashboard", ensureAuthenticated, authController.dashboard);

app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }});
  res.redirect("/login");
});

app.listen(3001, () => {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
