const userResolvers = require('./user');
const eventResolvers = require('./event');
const bookingResolvers = require('./booking');

exports.graphiqlResolvers = {
  ...userResolvers,
  ...eventResolvers,
  ...bookingResolvers,
};
