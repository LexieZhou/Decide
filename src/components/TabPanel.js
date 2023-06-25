import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ChartForce from './Chart_force';
import ChartClassify from './Chart_classify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderBottom: 'none',
  },
  tabbar: {
    backgroundColor: 'white',
    color: 'black',
    "& .MuiTabs-indicator": {
      backgroundColor: '#3f51b5',
    },
    boxShadow: 'none',
    borderBottom: 'none',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" className={classes.tabbar}> */}
      <div className={classes.tabbar}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="tabs"
        >
          <Tab label="Force-Directed View" {...a11yProps(0)} />
          <Tab label="Label-Classified View" {...a11yProps(1)} />
        </Tabs>
      </div>
      {/* </AppBar> */}
      <div className={classes.chart} id = "mydata_viz"></div>
        <TabPanel value={value} index={0}>
            <ChartForce />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ChartClassify />
        </TabPanel>
      </div>
  );
}
