import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import ChartClassify from './Chart_classify';
import ChartForce from './Chart_force';

const useStyles = makeStyles((theme) => ({
    
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
        <FormControl component="fieldset" className={classes.root}>
        <RadioGroup aria-label="radioTabs" value={value} onChange={handleChange} row>
            <FormControlLabel value="forceView" control={<Radio size="small" />} label="Force-Directed View" />
            <FormControlLabel value="classifyView" control={<Radio size="small" />} label="Label-Classified View" />
        </RadioGroup>
        </FormControl>
        {chartComponent}
    </div>
  );
}

export const selectedView = () => {
  return RadioButtonsGroup.value;
};
