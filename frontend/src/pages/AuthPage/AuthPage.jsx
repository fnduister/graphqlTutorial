import React, { Fragment } from 'react';
import { Input, Container, SubmitButton } from './styled';
import { Grid, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const AuthPage = () => {
  console.log('in auth');
  return (
    <Container>
      <Input container spacing={1} alignItems='flex-end'>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField id='input-with-icon-grid' label='Username' />
        </Grid>
      </Input>
      <Input container spacing={1} alignItems='flex-end'>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField id='input-with-icon-grid' label='Password' />
        </Grid>
      </Input>
      <SubmitButton variant='contained' color='primary'>
        Login
      </SubmitButton>
    </Container>
  );
};
