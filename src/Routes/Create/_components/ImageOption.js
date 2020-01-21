import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Http, CloudUpload, AddAPhoto } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';

const ImageOption = props => {
  const { classes } = props;
  const [uploadOption, setUploadOption] = useState('url');

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
          <Http />
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
            label='Image URL'
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
                Upload
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

ImageOption.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ImageOption;
