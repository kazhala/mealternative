import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { Avatar, TextField, IconButton, Button } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import {
  Link,
  CloudUpload,
  AddAPhoto,
  Clear,
  RotateLeft,
  Check
} from '@material-ui/icons';

const DetailsTab = props => {
  const {
    updateProfileDetails,
    classes,
    activeTab,
    tabIndex,
    profileUser
  } = props;

  const [displayProfile, setDisplayProfile] = useState(null);
  const [imageOption, setImageOption] = useState('url');
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageToggle = (e, value) => {
    setImageOption(value);
  };

  useEffect(() => {
    if (profileUser) {
      setDisplayProfile(profileUser);
    }
  }, [profileUser]);

  const handleChange = (name, value = null, file = null) => {
    if (name && value && !file) {
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    } else if (name === 'media' && file) {
      setNewImageFile(file);
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        photoUrl: window.URL.createObjectURL(file)
      }));
    } else if (name === 'clearImage') {
      setNewImageFile(null);
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        photoUrl: profileUser.photoUrl
      }));
    } else if (name === 'clearAll') {
      setNewImageFile(null);
      setDisplayProfile(prevProfile => ({
        ...profileUser
      }));
    }
  };

  const checkButtonEnable = () => {
    return profileUser.photoUrl === displayProfile.photoUrl;
  };

  const handleSubmit = () => {
    const upDateParams = { ...displayProfile, newImageFile };
    updateProfileDetails(upDateParams);
  };

  return (
    activeTab === tabIndex && (
      <div className={classes.detailsTabRoot}>
        {displayProfile && displayProfile._id ? (
          <>
            <Avatar
              className={classes.avatarDisplay}
              src={displayProfile.photoUrl}
            />
            <div className={classes.detailsAvatar}>
              <ToggleButtonGroup
                className={classes.toggleButtonGroup}
                size='small'
                value={imageOption}
                exclusive
                onChange={handleImageToggle}
              >
                <ToggleButton value={'url'}>
                  <Link />
                </ToggleButton>
                <ToggleButton value={'file'}>
                  <CloudUpload />
                </ToggleButton>
              </ToggleButtonGroup>
              {imageOption === 'url' && (
                <TextField
                  fullWidth
                  name='photoUrl'
                  variant='outlined'
                  size='small'
                  label='Profile URL'
                  onChange={e => handleChange('photoUrl', e.target.value)}
                  value={displayProfile.photoUrl}
                />
              )}

              {imageOption === 'file' && (
                <>
                  <input
                    accept='image/*'
                    type='file'
                    id='profile-image'
                    className={classes.fileInput}
                    onChange={e =>
                      handleChange('media', e.target.value, e.target.files[0])
                    }
                    name='media'
                  />
                  <label htmlFor='profile-image'>
                    <Button
                      startIcon={<AddAPhoto />}
                      variant='contained'
                      color='primary'
                      component='span'
                    >
                      Upload image
                    </Button>
                  </label>
                </>
              )}
              <IconButton
                disabled={checkButtonEnable()}
                onClick={e => handleChange('clearImage')}
              >
                <Clear />
              </IconButton>
            </div>

            <TextField
              className={classes.inputFields}
              value={displayProfile.username}
              onChange={e => handleChange('username', e.target.value)}
              variant='outlined'
              label='Username'
              fullWidth
            />
            <TextField
              className={classes.inputFields}
              value={displayProfile.email}
              onChange={e => handleChange('email', e.target.value)}
              variant='outlined'
              label='Email'
              fullWidth
            />
            <TextField
              className={classes.inputFields}
              value={displayProfile.about}
              onChange={e => handleChange('about', e.target.value)}
              variant='outlined'
              label='About'
              fullWidth
              multiline
              rowsMax={5}
              rows={5}
            />

            <div
              className={`${classes.detailSubmitGroup} ${classes.inputFields}`}
            >
              <Button
                onClick={() => handleChange('clearAll')}
                startIcon={<RotateLeft />}
                color='primary'
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                variant='outlined'
                startIcon={<Check />}
                color='primary'
              >
                Update
              </Button>
            </div>
          </>
        ) : (
          <PageSpinner loading={true} background='0,0,0,0' />
        )}
      </div>
    )
  );
};

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  profileUser: PropTypes.object,
  updateProfileDetails: PropTypes.func.isRequired
};

export default DetailsTab;
