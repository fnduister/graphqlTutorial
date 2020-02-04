import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { EventCard } from './styled';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Event({ data }) {
  const classes = useStyles();
  return (
    <EventCard className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Book
        </Button>
        <Button size='small' color='secondary'>
          Unbook
        </Button>
      </CardActions>
    </EventCard>
  );
}
