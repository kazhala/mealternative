/*
  Steps component for recipe creation
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import {
  StepContent,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from '@material-ui/core';
import StepBody from './StepBody';

const Steps = (props) => {
  const { classes, steps, handleDetailChange } = props;

  // current active step
  // using material ui stepper to create steps
  const [activeStep, setActiveStep] = useState(0);

  // check if re-order button should be disabled
  // btnNum[0, 1]
  const checkDisableReOrder = (btnNum) => {
    if (btnNum === 0) {
      return activeStep === btnNum;
    } else {
      return steps.length - activeStep <= 1;
    }
  };

  // disable remove button when there's only one step
  const checkDisableRemove = () => {
    return Boolean(steps.length < 2);
  };

  // call parent state handler to update step state
  const handleStepChange = (name, value) => {
    const updateParams = {
      index: activeStep,
      updateAttribute: name,
      newAttributeValue: value,
    };
    handleDetailChange('step', updateParams);
  };

  // check if the url input should be disabled
  const checkUrlShouldDisable = (stepDetail) => {
    return Boolean(stepDetail.stepImage.file);
  };

  // add a new step
  const handleAddStep = () => {
    handleDetailChange('addStep', activeStep);
    setActiveStep((prevActive) => prevActive + 1);
  };

  // remove step
  const handleRemoveStep = () => {
    handleDetailChange('removeStep', activeStep);
    setActiveStep((prevActive) => prevActive - 1);
  };

  // [0, 1] 0 = move up, 1 = move down
  // handle re order
  const handleReOrder = (type) => {
    const updateParams = {
      reOrderIndex: activeStep,
      reOrderType: type,
    };
    handleDetailChange('reOrderStep', updateParams);
    type === 0
      ? setActiveStep((prevActive) => prevActive - 1)
      : setActiveStep((prevActive) => prevActive + 1);
  };

  return (
    <div className={classes.stepsRoot}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step completed={false} key={index}>
            <StepLabel>
              <TextField
                fullWidth
                onClick={() => setActiveStep(index)}
                value={step.stepTitle}
                placeholder='Instructions'
                variant='outlined'
                size='small'
                multiline
                rowsMax={5}
                onChange={(e) => handleStepChange('stepTitle', e.target.value)}
              />
            </StepLabel>

            <StepContent>
              <StepBody
                classes={classes}
                step={step}
                handleReOrder={handleReOrder}
                checkDisableRemove={checkDisableRemove}
                handleStepChange={handleStepChange}
                checkUrlShouldDisable={checkUrlShouldDisable}
                checkDisableReOrder={checkDisableReOrder}
                handleAddStep={handleAddStep}
                handleRemoveStep={handleRemoveStep}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDetailChange: PropTypes.func.isRequired,
};

export default Steps;
