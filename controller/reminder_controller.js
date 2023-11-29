const database = require("../models/reminderModel");
const devID = require("../devIDs");

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

  create: async (req, res, next) => {
    let userData = database.reminderModel.findReminders(req.user.id);

    let reminder = {
      id: userData.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      cover: null
    };

    if (req.file) {
      reminder.cover = req.file.path.slice(6)
    } else if (req.body.cover){
      random_url = `https://api.unsplash.com/photos/random?client_id=${devID.unsplashID}`
      const response = await fetch(random_url);
      const data = await response.json();
      reminder.cover = data.urls.thumb;
    }

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

  update: async (req, res) => {
    let reminderToFind = req.params.id;
    let userData = database.reminderModel.findReminders(req.user.id);

    let userIndex = database.reminderDatabase.findIndex((user => user.id == req.user.id));
    let remIndex = userData.findIndex((rem => rem.id == reminderToFind));

    thisReminder = database.reminderDatabase[userIndex].reminders[remIndex];

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
      completed: remStatus,
      cover: null
    };

    if (req.file) {
      updatedReminder.cover = req.file.path.slice(6)
    } else if (req.body.cover){
      random_url = `https://api.unsplash.com/photos/random?client_id=${devID.unsplashID}`
      const response = await fetch(random_url);
      const data = await response.json();
      updatedReminder.cover = data.urls.thumb;
    } else if (req.body.remove){
      updatedReminder.cover = null;
    } else {
      updatedReminder.cover = thisReminder.cover;
    }

    // replace the entry
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
