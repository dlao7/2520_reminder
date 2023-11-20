const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated, isAdmin } = require("./middleware/checkAuth");

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

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
// Reminders
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Dashboard
app.get("/dashboard", ensureAuthenticated, authController.dashboard);
app.get("/admin", isAdmin, authController.admin)
app.get("/revoke/:id", authController.revoke)

// Register, Login or Logout
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.get("/logout", authController.logout);

app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, () => {
  console.log(
    "Server running. Visit: http://localhost:3001 in your browser 🚀"
  );
});

