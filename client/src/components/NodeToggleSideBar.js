import React, { useState, useEffect }  from 'react';
import { Toolbar, IconButton, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './ToggleSideBar.css';
import configData from "../data/config.json";
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Open Sans',
  },
  titleBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginTop: '1vh',
  },
  titleTxt: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '1.5vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    maxWidth: 380,
    marginTop: '1.5vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardHeader: {
    marginBottom: '1vh',
  },
  cardContent: {
    marginLeft: '1vw',
    marginRight: '1vw',
    marginBottom: '2vh',
  },
  keyValuePair: {
    marginTop: '1vh',
    marginBottom: '1vh',
  },
  highlightTxt: {
    fontSize: '12px',
    fontFamily: 'Open Sans',
    color: '#3f51b5',
  },
  subtitleTxt: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '1vh',
  },
  contentTxt: {
    fontSize: '12px',
    fontFamily: 'Open Sans',
  },
  contentURLTxt: {
    fontSize: '12px',
    fontFamily: 'Open Sans',
    textDecoration: 'underline',
  }


}));

const NodeToggleSideBar = () => {
  const classes = useStyles();
  const [nodeName, setNodeName] = useState(null);
  const [nodeVersion, setNodeVersion] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    document.getElementById('node-close-panel').addEventListener('click', function() {
      document.getElementById('node-right-panel').classList.remove('open');
    });
  }, []);

  useEffect(() => {
    window.addEventListener('nodeClick', function(e) {
      setNodeName(e.detail.name);
      setNodeVersion(e.detail.version);
    });
  }, []);

  useEffect(() => {
    fetch(`${configData.SERVER_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        setData(data[0][nodeName]);
      });
    
  }, [nodeName]);

  return (
      <div id="node-right-panel" className="node-right-panel">
        <Toolbar />
        <div className ={classes.titleBar}>
          <IconButton id="node-close-panel" color="primary" aria-label="add to shopping cart">
              <CloseIcon />
          </IconButton>
          <Typography className={classes.titleTxt}>Node Stats</Typography>
        </div>
        <div className = {classes.info}>
          <Card className={classes.card}>
            <div className={classes.cardContent}>
              <div className={classes.cardHeader}>
                <Typography className={classes.titleTxt}>{configData.LIBRARIES[nodeName]} {nodeVersion}</Typography>
              </div>
              <Divider />
              <div className={classes.keyValuePairs}>
                  <div className={classes.keyValuePair}>
                    <Typography className={classes.subtitleTxt}>
                      Keywords
                    </Typography>
                    <Typography className={classes.highlightTxt}>
                      {data && data.keywords && data.keywords.split(' ').map((keyword, index) => (
                        <span key={index}>
                          {keyword}
                          {index !== data.keywords.split(' ').length - 1 && ', '}
                        </span>
                      ))}
                    </Typography>
                  </div>
                  <div className={classes.keyValuePair}>
                    <Typography className={classes.subtitleTxt}>
                      License
                    </Typography>
                    <Typography className={classes.highlightTxt}>
                      {data && data.license}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.cardContent}>
                <Typography className={classes.subtitleTxt}>
                  Stats
                </Typography>
                <TableContainer component={Paper} className={classes.TableContainer}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableBody className={classes.tableBody}>
                      <TableRow key="Dependencies">
                        <TableCell component="th" scope="row">
                          <Typography className={classes.contentTxt}>
                          Dependencies
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography className={classes.contentTxt}>
                          {data && data["Dependencies"].value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Dependent packages">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Dependent packages
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["Dependent packages"].value}
                          </Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow key="Dependent repositories">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Dependent repositories
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["Dependent repositories"].value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Total releases">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Total releases
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["Total releases"].value}
                          </Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow key="Latest release">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Latest release
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["Latest release"].value}
                          </Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow key="First release">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          First release
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["First release"].value}
                          </Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow key="Stars">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Stars
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentURLTxt}>
                          {data && (<Link href={data["Stars"].href}>{data["Stars"].value}</Link>)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Forks">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Forks
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentURLTxt}>
                          {data && (<Link href={data["Forks"].href}>{data["Forks"].value}</Link>)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Watchers">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Watchers
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentURLTxt}>
                          {data && (<Link href={data["Watchers"].href}>{data["Watchers"].value}</Link>)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Contributors">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Contributors
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentURLTxt}>
                          {data && (<Link href={data["Contributors"].href}>{data["Contributors"].value}</Link>)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="Repository size">
                        <TableCell component="th" scope="row">
                        <Typography className={classes.contentTxt}>
                          Repository size
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography className={classes.contentTxt}>
                          {data && data["Repository size"].value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
          </Card>
        </div>
      </div>
  );
};
export default NodeToggleSideBar;