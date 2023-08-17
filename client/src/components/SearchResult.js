import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { filterData, filterDatabyEntityName } from './Chart_force';
import configData from '../data/config.json';

const useStyles = makeStyles((theme) => ({
    searchResult: {
        width: '600px',
        backgroundColor: '#3f51b5',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '300px',
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        fontFamily: 'Open Sans',
        '&:hover': {
            backgroundColor: "#3949ab",
        }
    },
    HintIcon: {
        marginRight: '10px',
        marginTop: '2px',
    },
    HintTxt: {
        marginTop: '1px',
        marginBottom: '1px',
    },
}));



export default function SearchResult({results, showHints}) {
    const classes = useStyles();
    const theme = createTheme({
    typography: {
      fontFamily: ["Open Sans", "sans-seri"].join(","),
    },
    });

    function handleEntityClick(entityName) {
        filterDatabyEntityName(entityName); 
    }


    return (
        <ThemeProvider theme={theme}>
            {results.length === 0 && showHints && (
            <div className={classes.searchResult}>
                <div className={classes.SingleSearchResult}>
                    <div className={classes.HintIcon}>
                        <SearchOutlinedIcon fontSize='small'/>
                    </div>
                    <p className={classes.HintTxt}>Python</p>
                </div>
                <div className={classes.SingleSearchResult}>
                    <div className={classes.HintIcon}>
                        <SearchOutlinedIcon fontSize='small'/>
                    </div>
                    <p className={classes.HintTxt}>Tensorflow 1.3</p>
                </div>
                <div className={classes.SingleSearchResult}>
                    <div className={classes.HintIcon}>
                        <SearchOutlinedIcon fontSize='small'/>
                    </div>
                    <p className={classes.HintTxt}>Is Python 3.6 compatible with Ubuntu 16.04?</p>
                </div>
                <div className={classes.SingleSearchResult}>
                    <div className={classes.HintIcon}>
                        <SearchOutlinedIcon fontSize='small'/>
                    </div>
                    <p className={classes.HintTxt}>Does CUDA 9 work with cuDNN 7.0.5?</p>
                </div>
            </div>
            )}
            { (results.length !== 0) && 
                (
                <div className={classes.searchResult}>
                  {results.map((result, id) => {
                    if (typeof result === 'string'){
                        return (
                            <div className={classes.SingleSearchResult} 
                                key={id} 
                                onClick={(e) => 
                                    filterDatabyEntityName(result)
                                }
                                >
                                    <div className={classes.HintIcon}>
                                        <SearchOutlinedIcon fontSize='small'/>
                                    </div>
                                {configData.LIBRARIES[result]}
                            </div>
                        );
                    } else {
                        return (
                            <div className={classes.SingleSearchResult} 
                                key={id} 
                                onClick={(e) => 
                                    filterData(result.id)
                                }
                                >
                                    <div className={classes.HintIcon}>
                                        <SearchOutlinedIcon fontSize='small'/>
                                    </div>
                                {result.name + ' ' + result.version}
                            </div>
                        );
                    }
                  })}
                </div>
                )
            }
        </ThemeProvider>
    );
}