/*
  Body of each step in stepper
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { TextField, IconButton, Avatar } from '@material-ui/core';
import {
  Image,
  Clear,
  ArrowUpward,
  ArrowDownward,
  Add,
  Remove,
} from '@material-ui/icons';

const StepBody = (props) => {
  const {
    step,
    classes,
    handleStepChange,
    checkUrlShouldDisable,
    checkDisableReOrder,
    handleAddStep,
    handleRemoveStep,
    checkDisableRemove,
    handleReOrder,
  } = props;

  return (
    <>
      {/* image preview */}
      {step.stepImage.previewUrl && (
        <Avatar
          variant='square'
          className={classes.stepPreview}
          src={step.stepImage.previewUrl}
          alt='thumbnail preview'
        />
      )}

      {/* image upload or url input */}
      <div className={classes.stepImage}>
        <TextField
          placeholder='Image Url'
          fullWidth
          disabled={checkUrlShouldDisable(step)}
          size='small'
          variant='outlined'
          value={step.stepImage.url}
          onChange={(e) => handleStepChange('stepImageUrl', e.target.value)}
        />
        <input
          accept='image/*'
          type='file'
          id='step-image'
          className={classes.fileInput}
          name='media'
          onChange={(e) => handleStepChange('stepImageFile', e.target.files[0])}
        />
        <label htmlFor='step-image'>
          <IconButton color='primary' component='span'>
            <Image />
          </IconButton>
        </label>
        <IconButton
          onClick={(e) => handleStepChange('clearFile', '')}
          size='small'
        >
          <Clear />
        </IconButton>
      </div>

      {/* description */}
      <TextField
        className={classes.stepDescriptions}
        value={step.stepDescriptions}
        onChange={(e) => handleStepChange('stepDescriptions', e.target.value)}
        placeholder='Extra tips'
        multiline
        rowsMax={2}
        fullWidth
        variant='outlined'
        size='small'
      />

      {/* button controls */}
      <div className={classes.stepButtons}>
        <div>
          <IconButton
            onClick={() => handleReOrder(0)}
            disabled={checkDisableReOrder(0)}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            onClick={() => handleReOrder(1)}
            disabled={checkDisableReOrder(1)}
          >
            <ArrowDownward />
          </IconButton>
        </div>
        <div>
          <IconButton
            disabled={checkDisableRemove()}
            onClick={handleRemoveStep}
          >
            <Remove />
          </IconButton>
          <IconButton onClick={handleAddStep}>
            <Add />
          </IconButton>
        </div>
      </div>
    </>
  );
};

StepBody.propTypes = {
  classes: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  handleStepChange: PropTypes.func.isRequired,
  checkUrlShouldDisable: PropTypes.func.isRequired,
  checkDisableReOrder: PropTypes.func.isRequired,
  handleAddStep: PropTypes.func.isRequired,
  handleRemoveStep: PropTypes.func.isRequired,
  checkDisableRemove: PropTypes.func.isRequired,
  handleReOrder: PropTypes.func.isRequired,
};

export default StepBody;
