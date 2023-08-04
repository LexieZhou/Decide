import React from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { fetchData } from "./Chart_force";
import { fetchClassifyData } from './Chart_classify';
import ChartClassify from './Chart_classify';
import ChartForce from './Chart_force';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px 0px',
  },
  button: {
    // margin: theme.spacing(1),
    marginTop: '1px',
    marginBottom: '1px',
    marginLeft: '8px',
    marginRight: '8px',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    height: '25px',
  },
}));

export default function RadioButtonsGroup() {
  const classes = useStyles();
  const [value, setValue] = React.useState('forceView');

  const handleChange = (event) => {
      setValue(event.target.value);
  };

  let chartComponent;
  if (value === 'forceView') {
      chartComponent = <ChartForce />;
  } else if (value === 'classifyView') {
      chartComponent = <ChartClassify />;
  }


  return (
    <div>
        <FormControl component="fieldset" className={classes.root} >
          <RadioGroup aria-label="radioTabs" value={value} onChange={handleChange} row>
              <FormControlLabel value="forceView" control={<Radio size="small" />} label="Force-Directed View" />
              <FormControlLabel value="classifyView" control={<Radio size="small" />} label="Label-Classified View" />
          </RadioGroup>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            className={classes.button}
            onClick={() => {
              if (value === "forceView") {
                fetchData();
              } else if (value === "classifyView") {
                fetchClassifyData();
              }
            }}
            >
            Whole View
          </Button>
        </FormControl>
        {chartComponent}
    </div>
  );
}
