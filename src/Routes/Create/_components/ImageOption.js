/*
  The image upload option component
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import {
  Clear,
  Link,
  CloudUpload,
  AddAPhoto,
  Visibility
} from '@material-ui/icons';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@material-ui/core';

const ImageOption = props => {
  const {
    thumbnailImage,
    handleDetailChange,
    classes,
    urlText,
    fileText
  } = props;
  // determine what to display
  const [uploadOption, setUploadOption] = useState('file');

  // update state
  const handleOptionChange = (event, newValue) => {
    setUploadOption(newValue);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      handleDetailChange('thumbFile', files[0]);
    } else {
      handleDetailChange('thumbUrl', value);
    }
  };

  const handleClear = () => {
    handleDetailChange('thumbFile', '');
  };

  const handleShowPreview = () => {
    handleDetailChange('thumbUrlPreview', '');
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
            onChange={handleChange}
            value={thumbnailImage.url}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPreview}>
                    <Visibility />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
        {uploadOption === 'file' && (
          <>
            <input
              accept='image/*'
              type='file'
              id='thumbnail-image-upload'
              className={classes.fileInput}
              onChange={handleChange}
              name='media'
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
            <IconButton onClick={handleClear}>
              <Clear />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

ImageOption.propTypes = {
  classes: PropTypes.object.isRequired,
  urlText: PropTypes.string.isRequired,
  fileText: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.object.isRequired,
  handleDetailChange: PropTypes.func.isRequired
};

export default ImageOption;
