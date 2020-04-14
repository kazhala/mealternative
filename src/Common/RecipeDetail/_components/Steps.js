/*
  stepper component to display recipe steps
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@material-ui/core';

const Steps = (props) => {
  const { classes, steps } = props;

  // current active step
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {/* display all steps */}
      {steps.map((step, index) => (
        // never complete a step
        <Step completed={false} key={index}>
          <StepLabel onClick={() => setActiveStep(index)}>
            <Typography className={classes.stepLabel} variant='h6'>
              {step.stepTitle}
            </Typography>
          </StepLabel>
          <StepContent>
            {/* display image if it contains image */}
            {step.stepImageUrl && (
              <div
                className={classes.stepImage}
                style={{
                  backgroundImage: `url(${step.stepImageUrl})`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            )}
            <Typography variant='body2'>{step.stepDescriptions}</Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
};

export default Steps;
