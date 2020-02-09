import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { Avatar, TextField, IconButton, Button } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Link, CloudUpload, AddAPhoto, Clear } from '@material-ui/icons';

const DetailsTab = props => {
  const { classes, activeTab, tabIndex, profileUser } = props;

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
    switch (name) {
      case 'photoUrl':
        setDisplayProfile(prevProfile => ({
          ...prevProfile,
          photoUrl: value
        }));
        break;
      case 'media':
        setNewImageFile(file);
        setDisplayProfile(prevProfile => ({
          ...prevProfile,
          photoUrl: window.URL.createObjectURL(file)
        }));
        break;
      case 'clear':
        setNewImageFile(null);
        setDisplayProfile(prevProfile => ({
          ...prevProfile,
          photoUrl: profileUser.photoUrl
        }));
        break;
      default:
        console.log(value);
        break;
    }
  };

  const checkButtonEnable = () => {
    return profileUser.photoUrl === displayProfile.photoUrl;
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
                onClick={e => handleChange('clear')}
              >
                <Clear />
              </IconButton>
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
  profileUser: PropTypes.object
};

export default DetailsTab;
