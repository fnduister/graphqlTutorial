const Event = require('../../models/events');
const User = require('../../models/users');
const { user } = require('./merge');
const { dateToString } = require('../../helpers/date');

exports.events = async () => {
  try {
    const events = await Event.find();
    return events.map((event) => {
      return {
        ...event._doc,
        creator: user(event._doc.creator),
        date: dateToString(event._doc.date),
      };
    });
  } catch (err) {
    throw err;
  }
};

exports.createEvent = async ({ eventInput }) => {
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
    creator.save();
    return { ...result._doc };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
