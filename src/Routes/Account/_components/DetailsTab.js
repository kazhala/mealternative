import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DetailsTab = props => {
  const { classes, activeTab, tabIndex } = props;

  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    activeTab === tabIndex && (
      <div className={classes.detailsTabRoot}>
        <div className={classes.detailsAvatar}>{/* asdfa */}</div>
      </div>
    )
  );
};

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired
};

export default DetailsTab;
