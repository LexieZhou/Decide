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
  },
  drawer: {
    flexShrink: 0,
    width: '30vw',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '2vh',
    marginLeft: '1vw',
  },
  drawerContainer: {
    // overflow: 'auto',
    marginTop: '2vh',
    marginLeft: '0vw',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

}));

export default function SideBar() {
  const classes = useStyles();
  const labels = ['driver', 'library', 'operating_system', 'runtime'];

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Typography className={classes.title}>Top 5 link-number nodes</Typography>
        <div className={classes.drawerContainer}>
        {labels.map((label, index) => (
          <div id={`barchart-${index}`} key={index}>
            <Barchart label={label} />
          </div>
        ))}
        </div>
      </Drawer>
  );
}
