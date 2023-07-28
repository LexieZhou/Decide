import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
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
    clearButton: {
      position: 'absolute',
      color: 'white',
      height: '100%',
      top: 0,
      right: 0,
    },
}));

export default function SearchBar({setResults}) {
    const [input, setInput] = useState("");
    const url = "http://localhost:4000/nodes";

    const fetchData = (value) => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          let results = [];
          if (Array.isArray(json)) {
            results = json.filter((node) => {
              const nodeString = `${node.name} ${node.version || ''}`.toLowerCase();
              return (
                value &&
                node &&
                node.name &&
                nodeString.includes(value.toLowerCase())
              );
            });
          } else {
            console.error('non-array data:', json);
          }
          console.log(results);
          setResults(results);
        })
        .catch((error) => {
          console.error('request failed:', error);
        });
    }
    
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }
    const handleClearClick = () => {
      setInput("");
      fetchData("");
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
            {input && (
            <IconButton
              size='small'
              className={classes.clearButton}
              onClick={handleClearClick}
            >
              <ClearIcon size='small'/>
            </IconButton>
          )}
          </div>
        </div>
    </ThemeProvider>
  );
  }