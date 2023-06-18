import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Chart from './components/Chart';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e8eaf6"
    }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-seri"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  appBar: {
    height: '8.2vh',
  },
  chart: {
    height: '91.8vh',
  },
}));

export default function APP() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.appBar}>
          <AppBar />
        </div>
        <div className={classes.chart} id = "mydata_viz">
          <Chart />
        </div>
      </div>
    </ThemeProvider>
  );
}