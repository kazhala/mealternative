import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Button, Avatar } from '@material-ui/core';
import {
  Image,
  Clear,
  ArrowUpward,
  ArrowDownward,
  Add,
  Remove
} from '@material-ui/icons';

const StepBody = props => {
  const {
    step,
    classes,
    handleStepChange,
    checkUrlShouldDisable,
    checkDisableButton,
    handleAddStep,
    handleRemoveStep,
    checkDisableRemove
  } = props;

  return (
    <>
      {step.stepImage.previewUrl && (
        <Avatar
          variant='square'
          className={classes.stepPreview}
          src={step.stepImage.previewUrl}
          alt='thumbnail preview'
        />
      )}

      <div className={classes.stepImage}>
        <TextField
          placeholder='Image Url'
          fullWidth
          disabled={checkUrlShouldDisable(step)}
          size='small'
          variant='outlined'
          value={step.stepImage.url}
          onChange={e => handleStepChange('stepImageUrl', e.target.value)}
        />
        <input
          accept='image/*'
          type='file'
          id='kazhala'
          className={classes.fileInput}
          name='media'
          onChange={e => handleStepChange('stepImageFile', e.target.files[0])}
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
        onChange={e => handleStepChange('stepDescriptions', e.target.value)}
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
  checkDisableButton: PropTypes.func.isRequired,
  handleAddStep: PropTypes.func.isRequired,
  handleRemoveStep: PropTypes.func.isRequired,
  checkDisableRemove: PropTypes.func.isRequired
};

export default StepBody;
