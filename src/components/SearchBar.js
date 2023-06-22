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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
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
    searchResult: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
        maxHeight: '200px',
        overflowY: 'scroll',
        color: 'black',

    },
    SingleSearchResult: {
        padding: '10px 20px',
        fontFamily: 'Open Sans',
        '&:hover': {
            backgroundColor: "#efefef",
        }
    },
}));

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResult] = useState([]);
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                    value &&
                    user && 
                    user.name && 
                    user.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                // console.log(results);
                setResult(results);
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
              {/* <div className={classes.searchResult}>
                  {results.map((result, id) => {
                    return <div className={classes.SingleSearchResult} key={id} onClick={(e) => alert(`You clicked on ${result.name}`)}>{result.name}</div>;
                  })}
              </div> */}
            </div>
    </ThemeProvider>
  );
  }