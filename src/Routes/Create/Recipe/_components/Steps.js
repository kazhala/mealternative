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
import { Image, ArrowUpward, ArrowDownward, Clear } from '@material-ui/icons';

const Steps = props => {
  const { classes, steps, handleDetailChange } = props;

  const [activeStep, setActiveStep] = useState(0);

  const checkDisableButton = btnNum => {
    if (btnNum === 0) {
      return activeStep === btnNum;
    } else {
      return steps.length - activeStep <= 1;
    }
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
                onChange={e => handleStepChange('stepTitle', e.target.value)}
              />
            </StepLabel>

            <StepContent>
              <div className={classes.stepImage}>
                <TextField
                  placeholder='Image Url'
                  fullWidth
                  disabled={checkUrlShouldDisable(step)}
                  size='small'
                  variant='outlined'
                  value={step.stepImage.url}
                  onChange={e =>
                    handleStepChange('stepImageUrl', e.target.value)
                  }
                />
                <input
                  accept='image/*'
                  type='file'
                  id='kazhala'
                  className={classes.fileInput}
                  name='media'
                  onChange={e =>
                    handleStepChange('stepImageFile', e.target.files[0])
                  }
                />
                <label htmlFor='kazhala'>
                  <IconButton color='primary' component='span'>
                    <Image />
                  </IconButton>
                </label>
                <IconButton
                  onClick={e => handleStepChange('clearFile', '')}
                  size='small'
                >
                  <Clear />
                </IconButton>
              </div>
              <TextField
                className={classes.stepDescriptions}
                value={step.stepDescriptions}
                onChange={e =>
                  handleStepChange('stepDescriptions', e.target.value)
                }
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
