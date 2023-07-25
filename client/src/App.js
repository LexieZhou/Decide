import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import SideBar from './components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';
import RadioPanel from './components/RadioPanel';

const themeLight = createTheme({
  palette: {
    background: {
      default: "white"
    }
  },
  typography: {
    fontFamily: ["Open Sans", "sans-seri"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    height: '8.2vh',
    zIndex: theme.zIndex.drawer + 1,
  },
  mainContainer: {
    height: '91.8vh',
    display: 'flex',
    flexDirection: 'row',
  },
  sideBar: {
    width: '20vw',
  },
  chartContainer: {
    height: '91.8vh',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '12vw',
  },
  radioPanel: {
    marginTop: '1vh',
    width: '80vw',
  },
}));

export default function APP() {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);


  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.appBar}>
          <AppBar />
        </div>
        <div className={classes.mainContainer}>
          <div className={classes.sideBar}>
            <SideBar />
          </div>
          <div className={classes.chartContainer}>
            <h1>{message}</h1>
            <div className={classes.radioPanel}>
              <RadioPanel />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}