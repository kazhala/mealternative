import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StepContent,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@material-ui/core';
import StepBody from './StepBody';

const Steps = props => {
  const { classes, steps, handleDetailChange } = props;

  const [activeStep, setActiveStep] = useState(0);

  const checkDisableReOrder = btnNum => {
    if (btnNum === 0) {
      return activeStep === btnNum;
    } else {
      return steps.length - activeStep <= 1;
    }
  };

  const checkDisableRemove = () => {
    return Boolean(steps.length < 2);
  };

  const handleStepChange = (name, value) => {
    const updateParams = {
      index: activeStep,
      updateAttribute: name,
      newAttributeValue: value
    };
    handleDetailChange('step', updateParams);
  };

  const checkUrlShouldDisable = stepDetail => {
    return Boolean(stepDetail.stepImage.file);
  };

  const handleAddStep = () => {
    handleDetailChange('addStep', activeStep);
    setActiveStep(prevActive => prevActive + 1);
  };

  const handleRemoveStep = () => {
    handleDetailChange('removeStep', activeStep);
  };

  // [0, 1] 0 = move up, 1 = move down
  const handleReOrder = type => {
    const updateParams = {
      reOrderIndex: activeStep,
      reOrderType: type
    };
    handleDetailChange('reOrderStep', updateParams);
    type === 0
      ? setActiveStep(prevActive => prevActive - 1)
      : setActiveStep(prevActive => prevActive + 1);
  };

  return (
    <div className={classes.stepsRoot}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step completed={false} key={index}>
            <StepLabel>
              <TextField
                onClick={() => setActiveStep(index)}
                value={step.stepTitle}
                placeholder='Title of the step'
                variant='outlined'
                size='small'
                onChange={e => handleStepChange('stepTitle', e.target.value)}
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
  handleDetailChange: PropTypes.func.isRequired
};

export default Steps;
