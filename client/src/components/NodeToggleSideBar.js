import React, { useState, useEffect }  from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './ToggleSideBar.css';
import configData from "../data/config.json";
import Card from '@material-ui/core/Card';


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
  cardContent: {
    marginLeft: '1vw',
    marginRight: '1vw',
  },
  subtitleTxt: {
    fontSize: '14px',
    fontWeight: 'bold',
  },


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
      fetch(`${configData.SERVER_URL}/stats`)
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    });
  }, []);
  
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
                <Typography className={classes.titleTxt}>{nodeName} {nodeVersion}</Typography>
              </div>
              <div className={classes.keyValuePairs}>
                  <div className={classes.keyValuePair}>
                    <Typography className={classes.subtitleTxt}>
                      Keywords
                    </Typography>
                  </div>
                  <div className={classes.keyValuePair}>
                    <Typography className={classes.subtitleTxt}>
                      License
                    </Typography>
                  </div>
                </div>
              </div>
          </Card>
        </div>
      </div>
  );
};
export default NodeToggleSideBar;