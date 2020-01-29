const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

const Event = require('./models/events');
const User = require('./models/users');

const events = async (eventIds) => {
  try {
    currentEvents = await Event.find({ _id: { $in: eventIds } });
    return currentEvents.map((event) => {
      return { ...event._doc, creator: user.bind(this, event._doc.creator) };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const currentUser = await User.findById(userId);
    return { ...currentUser._doc, createdEvents: events.bind(this, currentUser._doc.createEvent) };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type Event{
        _id: ID!
        title: String!
        date: String!
        description: String!
        price: Float!
        creator: User!
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
        users: [User!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event,
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
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
            return { ...user._doc, createEvents: events(user._doc.createEvents) };
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
            return { ...result._doc, password: null };
          } else {
            throw new Error('user already exist');
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    graphiql: true,
  }),
);

app.get('/', (req, res, next) => {
  res.send('hello world');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphql-demo-wyowx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
