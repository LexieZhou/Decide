import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Barchart from './Barchart';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100vw',
    overflow: 'hidden',
  },
  drawer: {
    flexShrink: 0,
    width: '30vw',
  },
  drawerPaper: {
    overflow: 'hidden',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '2vh',
    marginLeft: '2vw',
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: '2vh',
    marginLeft: '0.5vw',
    marginRight: '0vw',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

}));

export default function SideBar() {
  const classes = useStyles();
  const labels = ['driver', 'library', 'operating_system', 'runtime', 'application'];

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Typography className={classes.title}>Common DL Components</Typography>
        <div className={classes.drawerContainer}>
          {labels.map( (label) => (
              <Barchart label={label} key={label}/>
            ))}
        </div>
      </Drawer>
  );
}
