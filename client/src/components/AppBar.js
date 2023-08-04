import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import { createTheme, ThemeProvider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function HeadingAppBar() {
  const classes = useStyles();
  const theme = createTheme({
    typography: {
      fontFamily: ["Open Sans", "sans-seri"].join(","),
    },
  });
  const [results, setResults] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Knowledge-Graph Visualization
            </Typography>
            <SearchBar setResults={setResults}/>  
          </Toolbar>
        </AppBar> 
      </div>
      <SearchResult results={results}/>
    </ThemeProvider>
  );
}

