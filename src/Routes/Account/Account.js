/*
  Profile page
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import {
  Paper,
  AppBar,
  Tabs,
  Tab,
  Avatar,
  Typography
} from '@material-ui/core';
import { Settings, Book, MenuBook, VpnKey } from '@material-ui/icons';
import DetailsTab from './_components/DetailsTab';

// misc
import useStyles from './Style';

const Account = props => {
  const {
    activeTab,
    handleTabChange,
    profileUser,
    updateProfileDetails,
    detailLoading
  } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.accountRoot}>
        {/* profile avatar */}
        <div className={classes.accountTop}>
          <Avatar
            className={classes.accountAvatar}
            src={profileUser && profileUser.photoUrl}
          />
          <Typography variant='h6'>
            {profileUser && profileUser.username}
          </Typography>
        </div>

        {/* tabs to different contents */}
        <div className={classes.accountBottom}>
          {/* app bar for tabs */}
          <AppBar position='relative' color='default'>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor='primary'
              variant='fullWidth'
              textColor='primary'
            >
              <Tab icon={<Settings />} />
              <Tab icon={<Book />} />
              <Tab icon={<MenuBook />} />
              <Tab icon={<VpnKey />} />
            </Tabs>
          </AppBar>

          {/* tab panel to display information */}
          <Paper className={classes.tabPanel} elevation={1}>
            <DetailsTab
              updateProfileDetails={updateProfileDetails}
              profileUser={profileUser}
              classes={classes}
              tabIndex={0}
              activeTab={activeTab}
              detailLoading={detailLoading}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

Account.propTypes = {
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired
};

export default Account;
