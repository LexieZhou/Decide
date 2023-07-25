import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    postsList: {
        width: '100%',
        marginLeft: '3vw',
    },
    itemText: {
        fontSize: '8px',
        fontFamily: 'Open Sans',
    },
    avatar: {
        backgroundColor: '#e0e0e0',
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
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <a href={`https://stackoverflow.com/questions/${id}`}>
                            <LinkIcon />
                        </a>
                    </Avatar>
                  </ListItemAvatar>
                    <ListItemText className={classes.itemText} primary={`Votes: ${postVotes[index]}`}/>
                </ListItem>
            ))}
        </List>
    </div>
    )
}

export default PostsList;