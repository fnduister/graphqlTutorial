const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const { events } = require('./merge');
const { dateToString } = require('../../helpers/date');

const transformUser = (user) => ({
  ...user._doc,
  createdEvents: events(user._doc.createdEvents),
  lastSeen: dateToString(user._doc.lastSeen),
});

exports.users = async () => {
  try {
    const users = await User.find().populate('createdEvents');
    return users.map(transformUser);
  } catch (err) {
    throw err;
  }
};

exports.createUser = async ({ userInput }) => {
  try {
    if (
      !(await User.findOne({
        username: userInput.username,
        email: userInput.email,
      }))
    ) {
      const cryptedPassword = await bcrypt.hash(userInput.password, 12);
      const newUser = new User({
        username: userInput.username,
        lastSeen: Date(userInput.lastSeen),
        email: userInput.email,
        password: cryptedPassword,
        createEvents: [],
      });
      const result = await newUser.save();
      return transformUser(result);
    } else {
      throw new Error('user already exist');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
