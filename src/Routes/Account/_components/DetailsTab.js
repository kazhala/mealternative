/*
  the account details tab
*/

// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import {
  Avatar,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import {
  Link,
  CloudUpload,
  AddAPhoto,
  Clear,
  RotateLeft,
  Check,
  Description,
  ContactMail,
  Person
} from '@material-ui/icons';
import PageSpinner from '../../../Common/Spinner/PageSpinner';

const DetailsTab = props => {
  const {
    updateProfileDetails,
    classes,
    activeTab,
    tabIndex,
    profileUser,
    detailLoading,
    otherUserId
  } = props;

  // the data to be displayed, keep a copy locally for updating state without
  // changing calling redux until needed
  const [displayProfile, setDisplayProfile] = useState(null);
  // current image option [url, file]
  const [imageOption, setImageOption] = useState('url');
  // get the file data
  const [newImageFile, setNewImageFile] = useState(null);

  // change image otpion
  const handleImageToggle = (e, value) => {
    setImageOption(value);
  };

  // update user detail when data from redux changed
  // profileUser(redux), displayProfile(local state)
  useEffect(() => {
    if (profileUser) {
      setDisplayProfile(profileUser);
      // clean up the file data
      setNewImageFile(null);
    }
  }, [profileUser]);

  // update the local state
  const handleChange = (name, value = null, file = null) => {
    if (name === 'clearImage') {
      // reset the image change
      setNewImageFile(null);
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        photoUrl: profileUser.photoUrl
      }));
    } else if (name === 'clearAll') {
      // reset everything
      setNewImageFile(null);
      setDisplayProfile(prevProfile => ({
        ...profileUser
      }));
    } else if (name === 'media' && file) {
      // store file in state
      setNewImageFile(file);
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        photoUrl: window.URL.createObjectURL(file)
      }));
    } else {
      // update state
      setDisplayProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  // check if the reset button should be enabled
  const checkButtonEnable = () => {
    return profileUser.photoUrl === displayProfile.photoUrl;
  };

  // submit the data through redux
  const handleSubmit = () => {
    const upDateParams = { ...displayProfile, newImageFile };
    updateProfileDetails(upDateParams);
  };

  return (
    // display if active tab is this tab index
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        {/* onec everything is loaded, display */}
        {displayProfile && displayProfile._id && !otherUserId && (
          <div className={classes.tabWidthControl}>
            {/* profile avatar */}
            <Avatar
              className={classes.avatarDisplay}
              src={displayProfile.photoUrl}
            />
            <div className={classes.detailsAvatar}>
              {/* image option toggle group */}
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

              {/* url input of image */}
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

              {/* file upload for image */}
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

            {/* textfields to enter data */}
            <TextField
              className={classes.inputFields}
              value={displayProfile.email}
              variant='outlined'
              label='Email'
              fullWidth
              disabled
            />
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
              value={displayProfile.about}
              onChange={e => handleChange('about', e.target.value)}
              variant='outlined'
              label='About'
              fullWidth
              multiline
              rowsMax={5}
              rows={5}
            />

            {/* submit button group */}
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
          </div>
        )}
        {displayProfile && displayProfile._id && otherUserId && (
          <List
            component='div'
            className={classes.tabWidthControl}
            aria-label='user information'
          >
            <ListItem divider>
              <ListItemIcon>
                <ContactMail />
              </ListItemIcon>
              <ListItemText primary={profileUser.email} />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={profileUser.username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary={profileUser.about} />
            </ListItem>
          </List>
        )}
        <PageSpinner loading={detailLoading} background='0,0,0,0' />
      </div>
    )
  );
};

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  profileUser: PropTypes.object,
  updateProfileDetails: PropTypes.func.isRequired,
  detailLoading: PropTypes.bool.isRequired,
  otherUserId: PropTypes.string
};

export default DetailsTab;
