const reminderModel = require("./reminderModel");

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  createNewUser: (profile, option) => {
    // theoretically don't need to do this if autoincrement used?
    let userID = database.reduce((a, b) => a.id > b.id ? a : b).id + 1;
    let userEntry;
    // needs to check if the user is already in the system (by email)

    if (option === "social"){
      userEntry = { 
        id: userID,
        socialType: profile.provider,
        socialId: profile.id,
        name: profile.displayName, 
        email: profile.profileUrl, 
        role: "user"
      }
    } else if (option === "default"){
      userEntry = { 
        id: userID,
        name: profile.name, 
        email: profile.email,
        password: profile.password,
        role: "user"
     }
    }

    database.push(userEntry);

    let databaseEntry = {
      id: userID,
      reminders: [
        {
          id: 1,
          title: "Sample Title: Buy Groceries",
          description: "Sample Description: Buy milk from Safeway",
          completed: false,
          cover: null
        },
      ]
    }
    reminderModel.reminderDatabase.push(databaseEntry);

    return userEntry;

  },
  
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return false;
  },

  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return false;
  },

  findBySocialId: (provider, id) => {
    const user = database.find((user) => user.socialType === provider && user.socialId === id);

    if (user) {
      return user;
    }
    return false;
  },
};

module.exports = { database, userModel };
