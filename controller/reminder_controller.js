let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
    let reminderToFind = req.params.id;
    remIndex = database.cindy.reminders.findIndex((rem => rem.id == reminderToFind));

    // set boolean in description as true if the status of the radio button was true.
    if (req.body.completed === "true"){
      remStatus = true
    } else {
      remStatus = false
    }

    // update the description
    let updatedReminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: remStatus
    };

    // replace the entry
    database.cindy.reminders[remIndex] = updatedReminder;

    // Redirect to main reminders page.
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Find the index corresponding to the ID of the reminder.
    let reminderToFind = req.params.id;
    remIndex = database.cindy.reminders.findIndex((rem => rem.id == reminderToFind));
    
    // Remove the reminder at that index.
    database.cindy.reminders.splice(remIndex, 1);

    // Redirect to main reminders page.
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
