import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from "@material-ui/core";
import jsonData from "../data/new_records.json";
import { createGraph } from './Chart_force';

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

export const handleResultClick = (resultId) => {
    // console.log(`You clicked on ${resultName}, id: ${resultId}`);
    const [filteredNodes, filteredLinks] = filterData(resultId);
    // console.log("filteredNodes: ", filteredNodes);
    // console.log("filteredLinks: ", filteredLinks);
    const newData = {
        "nodes": filteredNodes,
        "links": filteredLinks
    };
    createGraph(newData);
}

export const filterData = (resultId) => {
    if (resultId === "") {
        // console.log("no received data");
        return [jsonData.nodes, jsonData.links];
    } else {
        console.log("resultId: ", resultId);
        const targetId = parseInt(resultId);
        const filteredNodes = jsonData.nodes.filter(node => {
            return node.id === targetId || node.childrens.includes(targetId);
        });
        const filteredLinks = jsonData.links.filter(link => {
            // console.log("link: ", link);
            return link.source.id === targetId || link.target.id === targetId;
        });
        return [filteredNodes, filteredLinks];
    }
}

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