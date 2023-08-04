import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    postsList: {
        width: '100%',
        marginLeft: '3vw',
    },
    itemText: {
        fontSize: '15px',
        fontFamily: 'Open Sans',
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: '1vw',
    }
}));
  
const PostsList = ({posts_id, posts_vote}) => {

    const classes = useStyles();
    // console.log("posts_id: ", posts_id);
    // console.log("posts_vote: ", posts_vote);

    // Split the strings into arrays
    const postIds = posts_id.split('_');
    const postVotes = posts_vote.split('_');

    return (
    <div className = {classes.postsList}>
        <List>
            {postIds.map((id, index) => (
                <ListItem key={index}>
                    <div className={classes.itemContainer}>
                        {/* <ListItemText className={classes.itemText} primary={`Votes: ${postVotes[index]}`}/> */}
                        <a href={`https://stackoverflow.com/questions/${id}`}>
                            <LinkIcon className={classes.linkIcon} color='primary' />
                        </a>
                        <Typography variant="subtitle2" className={classes.itemText}>
                                {`Votes: ${postVotes[index]}`}
                        </Typography>
                    </div>
                </ListItem>
            ))}
        </List>
    </div>
    )
}

export default PostsList;