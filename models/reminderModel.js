let reminderDatabase = [
  {
    id: 1,
    reminders: 
    [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
        cover: null
      },
      {
        id: 2,
        title: "Sleeping",
        description: "Nap for three hours",
        completed: false,
        cover: null
      },
    ] 
  },
  {
    id: 2,
    reminders:
    [
      {
        id: 1,
        title: "Sleeping",
        description: "Sleep a lot",
        completed: false,
        cover: null
      },
    ],
  },
  {
    id: 3,
    reminders:
    [
      {
        id: 1,
        title: "Python",
        description: "Read flask doc",
        completed: false,
        cover: null
      },
    ],
  }
]

const reminderModel = {
  findReminders: (id) => {
    const user = reminderDatabase.find((user) => user.id === id);
    if (user) {
      return user.reminders;
    }
    throw new Error("Couldn't find your reminders.");
  },
}

module.exports = { reminderDatabase, reminderModel };
