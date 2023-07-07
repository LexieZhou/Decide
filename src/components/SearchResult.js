import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from "@material-ui/core";
import { handleResultClick } from './Chart_force';

const useStyles = makeStyles((theme) => ({
    searchResult: {
        width: '200px',
        backgroundColor: '#3f51b5',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '200px',
        // overflowY: 'scroll',
        overflowY: 'auto',
        color: 'white',
        position: 'absolute',
        right: '20px',
        boxShadow: '0px 0px 5px 0px #ddd',
        borderRadius: '5px',

    },
    SingleSearchResult: {
        padding: '10px 20px',
        width: '100%',
        fontFamily: 'Open Sans',
        '&:hover': {
            backgroundColor: "#3949ab",
        }
    },
}));



export default function SearchResult({results}) {
    const classes = useStyles();
    const theme = createTheme({
    typography: {
      fontFamily: ["Open Sans", "sans-seri"].join(","),
    },
    });


    return (
        <ThemeProvider theme={theme}>
            { (results.length !== 0) && 
                (
                <div className={classes.searchResult}>
                  {results.map((result, id) => {
                    return (
                        <div className={classes.SingleSearchResult} 
                            key={id} 
                            onClick={(e) => handleResultClick(result.id)}
                            >
                            {result.name}
                        </div>
                    );
                  })}
                </div>
                )
            }
        </ThemeProvider>
    );
}