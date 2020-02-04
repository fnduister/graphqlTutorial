const Booking = require('../../models/bookings');
const { transformBooking } = require('./merge');

exports.bookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings.map(transformBooking);
  } catch (err) {
    throw err;
  }
};

exports.cancelBooking = async ({ eventId }, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated: you should sign in to commit this action');
  }
  try {
    const canceledBooking = await Booking.deleteOne({ eventId, userId: req.userId });
    return canceledBooking.deletedCount;
  } catch (err) {
    throw err;
  }
};

exports.createBooking = async ({ eventId }, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated: you should sign in to commit this action');
  }
  try {
    const newBooking = new Booking({
      eventId,
      userId: req.userId,
    });
    const savedBooking = await newBooking.save();
    return transformBooking(savedBooking);
  } catch (err) {
    throw err;
  }
};
