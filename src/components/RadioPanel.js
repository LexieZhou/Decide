import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ChartClassify from './Chart_classify';
import ChartForce from './Chart_force';

export default function RadioButtonsGroup() {
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
        <FormControl component="fieldset">
        <RadioGroup aria-label="radioTabs" value={value} onChange={handleChange} row>
            <FormControlLabel value="forceView" control={<Radio />} label="Force-Directed View" />
            <FormControlLabel value="classifyView" control={<Radio />} label="Label-Classified View" />
        </RadioGroup>
        </FormControl>
        <div id = "mydata_viz">
            <div id="chart">
                {chartComponent}
            </div>
        </div>
    </div>
  );
}
