import React, { useState, useEffect }  from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import configData from '../data/config.json';
import './ToggleSideBar.css';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  titleBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: '1vh',
  },
  titleTxt: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '1.5vh',
    marginLeft: '5vw',
  },
  nodeTxt: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '0.5vh',
    marginLeft: '1vw',
  },
  voteTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '1vh',
    marginLeft: '1vw',
  },
  panelContent: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    marginTop: '1vh',
    marginLeft: '1vw',
  },
  nodeInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: '1vw',
    // alignContent: 'center',
  },
  voteInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginLeft: '1vw',
    marginTop: '1vh',
  },

}));

const ToggleSideBar = () => {
  const classes = useStyles();
  const [linkData, setLinkData] = useState(null);

  useEffect(() => {
      document.getElementById('close-panel').addEventListener('click', function() {
        document.getElementById('right-panel').classList.remove('open');
      });
    }, []);

  useEffect(() => {
    window.addEventListener('linkClick', function(e) {
      console.log("linkClick", e.detail);
      setLinkData(e.detail);
    });
  }, []);
  
  return (
      <div id="right-panel" className="right-panel">
        <Toolbar />
        <div className ={classes.titleBar}>
        <IconButton id="close-panel" color="primary" aria-label="add to shopping cart">
            <CloseIcon />
        </IconButton>
        <Typography className={classes.titleTxt}>Vote Information</Typography>
        </div>
        {linkData && 
          <div className={classes.panelContent}>
            <div className={classes.nodeInfo}>
              <FiberManualRecordIcon style={{ color: configData.COLOR[linkData.source.label[0]] }}/>
              <Typography className={classes.nodeTxt}>{linkData.source.name} {linkData.source.version}</Typography>
            </div>
            <div className={classes.nodeInfo}>
              <FiberManualRecordIcon style={{ color: configData.COLOR[linkData.target.label[0]] }}/>
              <Typography className={classes.nodeTxt}>{linkData.target.name} {linkData.target.version}</Typography>
            </div>
            <div className={classes.voteInfo}>
              <Typography className={classes.voteTitle}>Positive Vote: {linkData.properties.pos_vote_num}</Typography>
            </div>
            <div className={classes.voteInfo}>
              <Typography className={classes.voteTitle}>Negative Vote: {linkData.properties.neg_vote_num}</Typography>
            </div>
        </div>}
      </div>
  );
};
export default ToggleSideBar;