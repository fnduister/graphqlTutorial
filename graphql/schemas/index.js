const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Event{
        _id: ID!
        title: String!
        date: String!
        description: String!
        price: Float!
        creator: User!
    }

    type Booking{
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type AuthData{
        token: String!
        tokenExpiration: Int!
        userId: ID!
    }

    type User{
        _id: ID!
        username: String!
        lastSeen: String!
        email: String!
        createdEvents: [Event!]!
    }

    input UserInput{
        username: String!
        password: String
        email: String!
    }

    input EventInput{
        title: String!
        date: String!
        description: String!
        price: Float!
    }

    type RootQuery {
        events: [Event!]!,
        users: [User!]!,
        bookings: [Booking!]!
        login(username: String, password: String): AuthData
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event,
        createUser(userInput: UserInput): User,
        createBooking(eventId: String): Booking,
        cancelBooking(eventId: String): Int
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `);
