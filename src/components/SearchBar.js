import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '200px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '200px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
    },
}));

export default function SearchBar({setResults}) {
    const [input, setInput] = useState("");
    
    const fetchData = (value) => {
      // fake api call
      fetch("http://localhost:8000/nodes")
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((node) => {
                return (
                value &&
                node &&
                node.name && 
                node.name.toLowerCase().includes(value.toLowerCase())
                );
        });
        console.log(results);
        setResults(results);
      });
    }
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }
    const classes = useStyles();
    const theme = createTheme({
    typography: {
      fontFamily: ["Open Sans", "sans-seri"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
        <div className={classes.searchContainer}>
          <div className={classes.searchBar}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={input}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
    </ThemeProvider>
  );
  }