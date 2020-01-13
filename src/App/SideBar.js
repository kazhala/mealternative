import React from 'react';
import PropTypes from 'prop-types';

import { Drawer, List, ListItem, ListItemIcon } from '@material-ui/core';

const SideBar = props => {
  const { classes, show, handleClose } = props;

  return (
    <Drawer open={show} onClose={handleClose}>
      <div className={classes.sideBarRoot}></div>
    </Drawer>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SideBar;
