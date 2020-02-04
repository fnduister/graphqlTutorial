const Event = require('../../models/events');
const User = require('../../models/users');
const { transformEvent } = require('./merge');

exports.events = async () => {
  try {
    const events = await Event.find();
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
};

exports.createEvent = async ({ eventInput }, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated: you should sign in to commit this action');
  }
  const newEvent = new Event({
    title: eventInput.title,
    date: Date.now(),
    description: eventInput.description,
    price: eventInput.price,
    creator: '5e31cc65639a323f346632cc',
  });
  try {
    const creator = await User.findById('5e31cc65639a323f346632cc');
    const result = await newEvent.save();
    if (!creator) throw new Error('this user does not ex');
    creator.createdEvents.push(result._doc._id);
    await creator.save();
    return transformEvent(result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
