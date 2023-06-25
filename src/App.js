import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import SideBar from './components/SideBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';
import TabPanel from './components/TabPanel';

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
    width: '30vw',
  },
  chartContainer: {
    height: '91.8vh',
    width: '70vw',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '70vw',
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
        <div className={classes.mainContainer}>
          <div className={classes.sideBar}>
            <SideBar />
          </div>
          <div className={classes.chartContainer}>
            <div className={classes.tabs}>
              <TabPanel />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}