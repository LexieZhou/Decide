import React, { useState, useEffect }  from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import configData from '../data/config.json';
import PostsList from './PostsList';
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
  firstLine: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
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
  verdictTxt: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '0.5vh',
    marginLeft: '1vw',
  },
  verdictInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '3vw',
    marginTop: '1vh',
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
    marginRight: '1vw',
    marginBottom: '1vh',
  },
  generalInfo: {
    marginLeft: '1vw',
    marginRight: '1vw',
    marginBottom: '2vh',
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
        <Typography className={classes.titleTxt}>Verdict Information</Typography>
        </div>
        {linkData && 
          <div className={classes.panelContent}>
            <div className={classes.firstLine}>
              <div className={classes.generalInfo}>
                <div className={classes.nodeInfo}>
                  <FiberManualRecordIcon style={{ color: configData.COLOR[linkData.source.label[0]] }}/>
                  <Typography className={classes.nodeTxt}>{linkData.source.name} {linkData.source.version}</Typography>
                </div>
                <div className={classes.nodeInfo}>
                  <FiberManualRecordIcon style={{ color: configData.COLOR[linkData.target.label[0]] }}/>
                  <Typography className={classes.nodeTxt}>{linkData.target.name} {linkData.target.version}</Typography>
                </div>
              </div>
              <div className={classes.verdictInfo}>
                {linkData.properties.verdict === 'yes' ? <ThumbUpIcon color="primary"/> : <ThumbDownIcon color="primary"/>}
                <Typography className={classes.verdictTxt}>Verdict: {linkData.properties.verdict}</Typography>
              </div>
            </div>
            <Divider />
            <div className={classes.detailInfo}>
              <div className={classes.voteInfo}>
                <Typography className={classes.voteTitle}>Positive Posts</Typography>
                <div className={classes.postList}>
                  {linkData.properties.pos_post_id !== "" && (
                    <PostsList posts_id={linkData.properties.pos_post_id} posts_vote={linkData.properties.pos_vote} />
                  )}
                </div>
              </div>
              <div className={classes.voteInfo}>
                <Typography className={classes.voteTitle}>Negative Posts</Typography>
                <div className={classes.postList}>
                  {linkData.properties.neg_post_id !== "" && (
                    <PostsList posts_id={linkData.properties.neg_post_id} posts_vote={linkData.properties.neg_vote} />
                  )}
                </div>
              </div>
            </div>
        </div>}
      </div>
  );
};
export default ToggleSideBar;