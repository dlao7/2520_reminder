let database = require("../models/reminderModel");

let remindersController = {
  list: (req, res) => {
    let userData = database.reminderModel.findReminders(req.user.id);
    if (userData) {
      res.render("reminder/index", { reminders: userData });
    }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let userData = database.reminderModel.findReminders(req.user.id);

    let searchResult = userData.find((reminder) => {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userData });
    }
  },

  create: (req, res) => {
    let userData = database.reminderModel.findReminders(req.user.id);
    // req.body.cover // true or false

    let reminder = {
      id: userData.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };

    userIndex = database.reminderDatabase.findIndex((user => user.id == req.user.id))
    database.reminderDatabase[userIndex].reminders.push(reminder);

    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let userData = database.reminderModel.findReminders(req.user.id);

    let searchResult = userData.find((reminder) => {
      return reminder.id == reminderToFind;
    });

    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let userData = database.reminderModel.findReminders(req.user.id);
    remIndex = userData.findIndex((rem => rem.id == reminderToFind));

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
    userIndex = database.reminderDatabase.findIndex((user => user.id == req.user.id))
    database.reminderDatabase[userIndex].reminders[remIndex] = updatedReminder;

    // Redirect to main reminders page.
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Find the index corresponding to the ID of the reminder.
    let reminderToFind = req.params.id;
    let userData = database.reminderModel.findReminders(req.user.id);
    remIndex = userData.findIndex((rem => rem.id == reminderToFind));
    
    // Remove the reminder at that index.
    userIndex = database.reminderDatabase.findIndex((user => user.id == req.user.id))
    database.reminderDatabase[userIndex].reminders.splice(remIndex, 1);

    // Redirect to main reminders page.
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
