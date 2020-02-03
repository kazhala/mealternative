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
  const { classes } = props;

  const steps = [0, 1, 2, 3, 4, 5];

  return (
    <Stepper activeStep={1} orientation='vertical'>
      {steps.map((step, index) => (
        <Step completed={false} key={index}>
          <StepLabel>
            <Typography variant='h6'>title1</Typography>
          </StepLabel>
          <StepContent>
            <div className={classes.stepImage} />
            <Typography variant='body2'>
              Similique nemo itaque ratione cumque. Laborum occaecati eius
              ratione ex assumenda. Earum reprehenderit fugit accusantium facere
              minus quibusdam.
            </Typography>
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
  classes: PropTypes.object.isRequired
};

export default Steps;
