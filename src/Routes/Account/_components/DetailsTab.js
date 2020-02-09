import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { Avatar } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Link, CloudUpload } from '@material-ui/icons';

const DetailsTab = props => {
  const { classes, activeTab, tabIndex, profileUser } = props;

  const [displayProfile, setDisplayProfile] = useState(null);
  const [imageOption, setImageOption] = useState('url');

  const handleImageToggle = (e, value) => {
    setImageOption(value);
  };

  useEffect(() => {
    if (profileUser) {
      setDisplayProfile(profileUser);
    }
  }, [profileUser]);

  return (
    activeTab === tabIndex && (
      <div className={classes.detailsTabRoot}>
        {displayProfile && displayProfile.photoUrl ? (
          <div className={classes.detailsAvatar}>
            <Avatar src={displayProfile.photoUrl} />
            <ToggleButtonGroup
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
          </div>
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
