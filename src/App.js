import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Chart from './components/Chart';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  appBar: {
    height: '9vh',
  },
  chart: {
    height: '91vh',
  },
}));

export default function APP() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <div className={classes.appBar}>
        <AppBar />
      </div>
      <div className={classes.chart}>
        <Chart />
      </div>
    </div>
  );
}