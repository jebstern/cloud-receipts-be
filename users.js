const User = require("./models/user");

async function getUserById(id) {
  let user;
  try {
    user = await User.findOne({ id: id.toString() }, "-_id").exec();
  } catch (err) {
    err.stack;
  }
  return user;
}

module.exports = {
  getUserById: getUserById,
};
