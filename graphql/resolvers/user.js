const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { transformUser } = require('./merge');

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

exports.login = async ({ username, password }) => {
  try {
    const currentUser = await User.findOne({ username });
    if (!currentUser) {
      throw new Error('username or password not valid');
    }
    if (!(await bcrypt.compare(password, currentUser.password))) {
      throw new Error('username or password not valid');
    }
    const token = jwt.sign(
      { userId: currentUser.id, username: currentUser.username },
      'somereallysuperkeybro',
      { expiresIn: '1h' },
    );
    return { userId: currentUser.id, token, tokenExpiration: 1 };
  } catch (err) {
    throw err;
  }
};
