import React from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button
} from '@material-ui/core';

const Steps = props => {
  const { classes, steps } = props;

  return (
    <Stepper activeStep={1} orientation='vertical'>
      {steps.map((step, index) => (
        <Step completed={false} key={index}>
          <StepLabel>
            <Typography variant='h6'>{step.stepTitle}</Typography>
          </StepLabel>
          <StepContent>
            {step.stepImageUrl && (
              <div
                className={classes.stepImage}
                style={{
                  backgroundImage: `url(${step.stepImageUrl})`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
            )}
            <Typography variant='body2'>{step.stepDescriptions}</Typography>
            <div className={classes.stepBtns}>
              <Button>Back</Button>
              <Button>Next</Button>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired
};

export default Steps;
