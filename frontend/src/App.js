import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { EventsPage } from './pages/EventsPage/EventsPage';
import { BookingsPage } from './pages/Bookingspage/BookingsPage';
import Navbar from './components/Navbar/Navbar';
import { Main, MainContainer, Content } from './styled';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainContainer container alignContent='center'>
        <Main item sm={8} xs>
          <Content>
            <Switch>
              <Redirect from='/' to='/login' exact />
              <Route path='/login' component={AuthPage} />
              <Route path='/bookings' component={BookingsPage} />
              <Route path='/events' component={EventsPage} />
            </Switch>
          </Content>
        </Main>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
