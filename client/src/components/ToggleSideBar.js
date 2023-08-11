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
  firstLine: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  secondLine: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: '1vw',
    marginBottom: '2vh',
  },
  titleTxt: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '1.5vh',
    marginLeft: '2vw',
  },
  nodeTxt: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '0.5vh',
    marginLeft: '0.5vw',
  },
  scoreTxt: {
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
   // marginLeft: '1vw',
    marginTop: '1vh',
  },

}));

// const compatibleScore = (linkData) => {
//   const pos_vote = linkData.properties.pos_vote;
//   const neg_vote = linkData.properties.neg_vote;

//   if (pos_vote !== "" && neg_vote !== "") {
//     const posVotes = pos_vote.split('_');
//     const negVotes = neg_vote.split('_');
//     console.log(posVotes);
//     console.log(negVotes);

//     let sumPosVotes = 0;
//     let sumNegVotes = 0;

//     for (let i = 0; i < posVotes.length; i++) {
//       sumPosVotes += parseInt(posVotes[i]);
//     }
//     for (let i = 0; i < negVotes.length; i++) {
//       sumNegVotes += parseInt(negVotes[i]);
//     }

//     const score = (sumPosVotes - sumNegVotes) / (sumPosVotes + sumNegVotes);
//     return score;
//   } else if (pos_vote === "") {
//     const negVotes = neg_vote.split('_');
//     let sumNegVotes = 0;
//     for (let i = 0; i < negVotes.length; i++) {
//       sumNegVotes += parseInt(negVotes[i]);
//     }
//     const score = -1 * sumNegVotes;
//     return score;
//   } else if (neg_vote === "") {
//     const posVotes = pos_vote.split('_');
//     let sumPosVotes = 0;
//     for (let i = 0; i < posVotes.length; i++) {
//       sumPosVotes += parseInt(posVotes[i]);
//     }
//     const score = sumPosVotes;
//     return score;
//   }

//   return 0;
// };

const ToggleSideBar = () => {
  const classes = useStyles();
  const [linkData, setLinkData] = useState(null);
  // const [score, setScore] = useState(null);

  useEffect(() => {
      document.getElementById('close-panel').addEventListener('click', function() {
        document.getElementById('right-panel').classList.remove('open');
      });
    }, []);

  useEffect(() => {
    window.addEventListener('linkClick', function(e) {
      setLinkData(e.detail);
      // setScore(compatibleScore(e.detail));
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
            </div>
            {/* <div className={classes.secondLine}>
              <div className = {classes.score}>
                <Typography className={classes.scoreTxt}>Compatible Score: {score}</Typography>
              </div>
            </div> */}
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