const Booking = require('../../models/bookings');
const { user, event } = require('./merge');
const { dateToString } = require('../../helpers/date');

const transformBooking = (booking) => ({
  ...booking._doc,
  user: user(booking._doc.userId),
  event: event(booking._doc.eventId),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt),
});

exports.bookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings.map(transformBooking);
  } catch (err) {
    throw err;
  }
};

exports.cancelBooking = async ({ eventId, userId }) => {
  try {
    const canceledBooking = await Booking.deleteOne({ eventId, userId });
    return canceledBooking.deletedCount;
  } catch (err) {
    throw err;
  }
};

exports.createBooking = async ({ eventId, userId }) => {
  try {
    const newBooking = new Booking({
      eventId,
      userId,
    });
    const savedBooking = await newBooking.save();
    return transformBooking(savedBooking);
  } catch (err) {
    throw err;
  }
};
