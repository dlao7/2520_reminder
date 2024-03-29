const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email); // instead queries database and checks for an email and password combination
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserBySocialId = (provider, id) => {
  let user = userModel.findBySocialId(provider, id);
  if (user) {
    return user;
  }
  return null;
};

isUserValid = (user, password) => {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserBySocialId,
};
