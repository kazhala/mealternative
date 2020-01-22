import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StepContent,
  Stepper,
  Step,
  StepLabel,
  TextField,
  IconButton,
  Button
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const Steps = props => {
  const { classes, steps } = props;

  const [activeStep, setActiveStep] = useState(0);

  const checkDisableButton = btnNum => {
    if (btnNum === 0) {
      return activeStep === btnNum;
    } else {
      return steps.length - activeStep <= 1;
    }
  };

  return (
    <div className={classes.stepsRoot}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step completed={false} key={index}>
            <StepLabel>
              <TextField
                value={step.stepTitle}
                placeholder='Title of the step'
                variant='outlined'
                size='small'
              />
            </StepLabel>

            <StepContent>
              <TextField
                value={step.stepDescriptions}
                placeholder='Enter description of the step'
                rows={4}
                multiline
                rowsMax={4}
                fullWidth
                variant='outlined'
                size='small'
              />

              <div className={classes.stepButtons}>
                <div>
                  <IconButton disabled={checkDisableButton(0)}>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton disabled={checkDisableButton(1)}>
                    <ArrowDownward />
                  </IconButton>
                </div>
                <Button color='primary' variant='contained'>
                  ADD step
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Steps;
