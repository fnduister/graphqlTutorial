const Event = require('../../models/events');
const User = require('../../models/users');

const events = async (eventIds) => {
  try {
    const currentEvents = await Event.find({ _id: { $in: eventIds } });
    return currentEvents.map((event) => {
      return { ...event._doc, creator: () => user(event._doc.creator) };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const currentUser = await User.findById(userId);
    return {
      ...currentUser._doc,
      createdEvents: events(currentUser._doc.createdEvents),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.event = async (eventId) => {
  try {
    const currentEvent = await Event.findById(eventId);
    return {
      ...currentEvent._doc,
      creator: () => user(currentEvent._doc.creator),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.events = events;
exports.user = user;
