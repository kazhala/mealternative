import React from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography
} from '@material-ui/core';

const Steps = props => {
  const { classes } = props;

  const steps = [0, 1, 2];

  return (
    <div className={classes.detailSteps}>
      <Stepper activeStep={1} orientation='vertical'>
        {steps.map((step, index) => (
          <Step completed={false} key={index}>
            <StepLabel>
              <Typography variant='body1'>title1</Typography>
            </StepLabel>
            <StepContent>asfasfsa</StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Steps;
