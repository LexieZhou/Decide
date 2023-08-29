import React, { useState, useEffect }  from 'react';
import { Toolbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
    justifyContent: 'flex-start',
    marginTop: '1vh',
  },
  basicInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginTop: '2vh',
    marginBottom: '1vh',
  },
  firstColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: '1vw',
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: '3vw',
  },
  titleTxt: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '1.5vh',
    marginLeft: '6vw',
  },
  nodeTxt: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '0.5vh',
    marginLeft: '0.5vw',
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
  detailInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginTop: '1vh',
  },
  nodeInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  voteInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginLeft: '1vw',
    marginTop: '1vh',
  },
  postList: {
    marginTop: '1vh',
  }

}));

const computeScore = (data) => {
  const posVotes = data.properties.pos_vote.split("_");
  const negVotes = data.properties.neg_vote.split("_");
  let posVotesNum = 0;
  let negVotesNum = 0;

  if (posVotes[0] !== "") {
    for (const vote of posVotes) {
      posVotesNum += parseInt(vote);
    }
  }

  if (negVotes[0] !== "") {
    for (const vote of negVotes) {
      negVotesNum += parseInt(vote);
    }
  }

  const score = Math.abs(posVotesNum - negVotesNum) / (posVotesNum + negVotesNum);
  const limitedScore = score.toFixed(2);
  
  return limitedScore;
};

const ToggleSideBar = () => {
  const classes = useStyles();
  const [linkData, setLinkData] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
      document.getElementById('close-panel').addEventListener('click', function() {
        document.getElementById('right-panel').classList.remove('open');
      });
    }, []);

  useEffect(() => {
    window.addEventListener('linkClick', function(e) {
      setLinkData(e.detail);
      setScore(computeScore(e.detail));
    });
  }, []);
  
  return (
      <div id="right-panel" className="right-panel">
        <Toolbar />
        <div className ={classes.titleBar}>
        <IconButton id="close-panel" color="primary" aria-label="add to shopping cart">
            <CloseIcon />
        </IconButton>
        <Typography className={classes.titleTxt}>Compatible Information</Typography>
        </div>
        {linkData && 
          <div className={classes.panelContent}>
            <div className={classes.basicInfo}>
              <div className={classes.firstColumn}>
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
              </div>
              <div className={classes.secondColumn}>
                <Typography className={classes.nodeTxt}>Relationship: {linkData.properties.verdict === "yes" ? "Compatible" : "Incompatible"}</Typography>
                <Typography className={classes.nodeTxt}>Evidence Score: {score}</Typography>
              </div>
            </div>
            <Divider />
            <div className={classes.detailInfo}>
              {linkData.properties.pos_post_id !== "" && (
              <div className={classes.voteInfo}>
                <Typography className={classes.voteTitle}>Posts supporting compatible relationship</Typography>
                <div className={classes.postList}>
                  <PostsList posts_id={linkData.properties.pos_post_id} posts_vote={linkData.properties.pos_vote} />
                </div>
              </div> 
              )}
              
              {linkData.properties.neg_post_id !== "" && (
              <div className={classes.voteInfo}>
                <Typography className={classes.voteTitle}>Posts supporting incompatible relationship</Typography>
                <div className={classes.postList}>
                  <PostsList posts_id={linkData.properties.neg_post_id} posts_vote={linkData.properties.neg_vote} />
                </div>
              </div>
              )}
            </div>
        </div>}
      </div>
  );
};
export default ToggleSideBar;