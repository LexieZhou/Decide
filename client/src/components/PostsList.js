import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
    postsList: {
        width: '100%',
        marginLeft: '0.5vw',
    },
    itemText: {
        fontSize: '11px',
        fontFamily: 'Open Sans',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    link: {
        fontSize: '11px',
        fontFamily: 'Open Sans',
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expandBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));
  
const PostsList = ({posts_id, posts_vote}) => {

    const classes = useStyles();

    const postIds = posts_id.split('_');
    const postVotes = posts_vote.split('_');
    
    const [numToShow, setNumToShow] = useState(4);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        if (expanded) {
            setNumToShow(5);
        } else {
        setNumToShow(postIds.length);
        }
        setExpanded(!expanded);
    };

    return (
    <div className = {classes.postsList}>
        <List>
            {postIds.slice(0, numToShow).map((id, index) => (
                <ListItem key={index}>
                    <div className={classes.itemContainer}>
                        <Typography variant="subtitle2" className={classes.itemText}>
                            {`Votes: ${postVotes[index]}`}
                        </Typography>
                        <div className={classes.link}>
                            <a href={`https://stackoverflow.com/questions/${id}`}>https://stackoverflow.com/questions/{id}</a>
                        </div>
                    </div>
                </ListItem>
            ))}
        </List>
        <div className = {classes.btn}>
            {expanded === false && postIds.length > numToShow && (
                <IconButton color="primary" onClick={handleExpandClick} aria-label="Expand More">
                    <ExpandMoreIcon fontSize='large'/>
                </IconButton>
            )}
            {expanded === true && (
                <IconButton color="primary" onClick={handleExpandClick} aria-label="Expand Less" className={classes.expandBtn}>
                    <ExpandLessIcon fontSize="large"/>
                </IconButton>
            )}
        </div>
    </div>
    )
}

export default PostsList;