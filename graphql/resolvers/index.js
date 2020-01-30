const bcrypt = require('bcryptjs');
const Event = require('../../models/events');
const User = require('../../models/users');
const Booking = require('../../models/bookings');
const events = async (eventIds) => {
  try {
    currentEvents = await Event.find({ _id: { $in: eventIds } });
    return currentEvents.map((event) => {
      console.log('TCL: events -> event', event);
      return { ...event._doc, creator: () => user(event._doc.creator) };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  console.log('TCL: user -> userId', userId);
  try {
    const currentUser = await User.findById(userId);
    console.log('TCL: user -> currentUser', currentUser);
    return {
      ...currentUser._doc,
      createdEvents: events(currentUser._doc.createdEvents),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const event = async (eventId) => {
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

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...bookings._doc,
          user: user(booking._doc.userId),
          event: event(booking._doc.eventId),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createBooking: async ({ eventId, userId }) => {
    try {
      const newBooking = new Booking({
        eventId,
        userId,
      });
      const savedBooking = await newBooking.save();
      return {
        ...savedBooking._doc,
        user: user(savedBooking._doc.userId),
        event: event(savedBooking._doc.eventId),
      };
    } catch (err) {
      throw err;
    }
  },

  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return { ...event._doc, creator: user(event._doc.creator) };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }) => {
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
  },

  users: async () => {
    try {
      const users = await User.find().populate('createdEvents');
      return users.map((user) => {
        return { ...user._doc, createdEvents: events(user._doc.createdEvents) };
      });
    } catch (err) {
      throw err;
    }
  },

  createUser: async ({ userInput }) => {
    console.log('TCL: userInput', userInput);
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
        return {
          ...result._doc,
          password: null,
          createdEvents: () => events(result._doc.createEvents),
        };
      } else {
        throw new Error('user already exist');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
