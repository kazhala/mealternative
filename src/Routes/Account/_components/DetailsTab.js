import React from 'react';
import PropTypes from 'prop-types';

const DetailsTab = props => {
  const { classes, activeTab, tabIndex } = props;

  return activeTab === tabIndex && <div>I'm active</div>;
};

DetailsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired
};

export default DetailsTab;
