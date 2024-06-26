import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicorncoin.jpg'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import ExpenseOverview from './../expense/ExpenseOverview'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(4),
    borderRadius: 20,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff', // White background for a clean look
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: '#2e7d32', // A shade of blue for the title
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '2rem', // Larger font size for prominence
    borderBottom: '2px solid #f0f0f0', // Border to separate title
    marginBottom: theme.spacing(3),
  },
  media: {
    minHeight: 440,
    borderRadius: '20px 20px 0 0',
    filter: 'brightness(95%)',
  },
  credit: {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    backgroundColor: '#fafafa', // Light grey background
    borderTop: '1px solid #d0d0d0', // Border at the top for separation
    fontSize: '0.85rem',
    fontStyle: 'italic',
    color: '#777', // Soft grey text color
    '& a': {
      color: '#2e7d32', // Blue color for links
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  link: {
    color: '#2e7d32', // Same blue color for consistency
    textDecoration: 'none',
    fontWeight: 600, // Bold links for visibility
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cardContent: {
    textAlign: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f9f9f9', // Light grey background for the content area
  },
  welcomeText: {
    color: '#333', // Dark grey for the welcome text
    fontSize: '1.2rem',
    marginBottom: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  
  return (
    <>
      {auth.isAuthenticated() && <ExpenseOverview />}
      {!auth.isAuthenticated() && typeof window !== "undefined" && (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} image={unicornbikeImg} title="Home Image" />
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">
          </Typography>
          <CardContent className={classes.cardContent}>
            <Typography variant="body1" component="p" className={classes.welcomeText}>
              Welcome to SPEND SMART. <Link to='/signup' className={classes.link}>Sign up</Link> or <Link to='/signin' className={classes.link}>sign in</Link> to get started.
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

