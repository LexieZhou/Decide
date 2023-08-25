import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from "@material-ui/core";
import configData from '../data/config.json';

const useStyles = makeStyles((theme) => ({
    searchBar: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '600px',
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
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
    },
    clearButton: {
      position: 'absolute',
      color: 'white',
      height: '100%',
      top: 0,
      right: 0,
    },
}));

export default function SearchBar({setResults, setShowHints}) {
    const [input, setInput] = useState("");
    const url = `${configData.SERVER_URL}/nodes`;
    const libraries = configData.LIBRARIES;

    const fetchData = (value) => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          let results = [value];
          let entity_results = [];
          let node_results = [];

          // search by entity name
          entity_results = Object.keys(libraries).filter((libKey) => {
            const lib = libraries[libKey];
            return (
              value &&
              lib &&
              lib.toLowerCase().includes(value.toLowerCase())
            );
          });
          results = results.concat(entity_results);
          
          // search by node name and node version
          node_results = json.filter((node) => {
            const nodeString = `${node.name} ${node.version || ''}`.toLowerCase();
            return (
              value &&
              node &&
              node.name &&
              nodeString.includes(value.toLowerCase())
            );
          });
          // combine entity and node search results
          results = results.concat(node_results);

          console.log('results: ', results);
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
              onChange={(e) => {
                if (e.target.value === "") {
                  setShowHints(true);
                }
                handleChange(e.target.value);
              }}
              onFocus={() => setShowHints(true)}
              // onBlur={() => setShowHints(false)}
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