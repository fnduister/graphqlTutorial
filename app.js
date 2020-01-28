const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
    type Event{
        _id: ID!
        title: String!
        date: String!
        description: String!
        price: Float!
    }

    input EventInput{
        title: String!
        date: String!
        description: String!
        price: Float!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: ({eventInput}) => {
        console.log("TCL: eventInput", eventInput.title)
            const newEvent = {
                _id: Math.random().toString(),
                title: eventInput.title,
                date: eventInput.date,
                description: eventInput.description,
                price: eventInput.price
            }
            events.push(newEvent);
            return events;
        }
    },
    graphiql: true,
}))

app.get('/', (req, res, next) => {
    res.send('hello world');
}) 

app.listen(3002);