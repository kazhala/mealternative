/*
  The image upload option component
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Link, CloudUpload, AddAPhoto } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';

const ImageOption = props => {
  const { classes, urlText, fileText } = props;
  // determine what to display
  const [uploadOption, setUploadOption] = useState('file');

  // update state
  const handleOptionChange = (event, newValue) => {
    setUploadOption(newValue);
  };

  return (
    <div className={classes.imageOption}>
      <ToggleButtonGroup
        size='small'
        value={uploadOption}
        exclusive
        onChange={handleOptionChange}
      >
        <ToggleButton value='url'>
          <Link />
        </ToggleButton>
        <ToggleButton value='file'>
          <CloudUpload />
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={classes.imageInput}>
        {uploadOption === 'url' && (
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            label={urlText}
          />
        )}
        {uploadOption === 'file' && (
          <>
            <input
              accept='image/*'
              type='file'
              id='thumbnail-image-upload'
              className={classes.fileInput}
            />
            <label htmlFor='thumbnail-image-upload'>
              <Button
                startIcon={<AddAPhoto />}
                variant='contained'
                color='primary'
                component='span'
              >
                {fileText}
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

ImageOption.propTypes = {
  classes: PropTypes.object.isRequired,
  urlText: PropTypes.string.isRequired,
  fileText: PropTypes.string.isRequired
};

export default ImageOption;
