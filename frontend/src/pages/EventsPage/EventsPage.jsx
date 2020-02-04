import React from 'react';
import Event from '../../components/Event/Event';
import events from './data';
import {EventCard} from './styled';

export const EventsPage = () => {
  console.log('in auth');
  return (
    <EventCard>
      {events.map((event) => {
        return <Event data={event} key={event.title}/>;
      })}
    </EventCard>
  );
};
