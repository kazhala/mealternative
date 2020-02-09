import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import useStyles from './Style';
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

const Account = props => {
  const {
    activeTab,
    handleTabChange,
    isAuthenticated,
    profileUser,
    checkFetchOtherUser,
    updateProfileDetails
  } = props;
  const classes = useStyles();

  return (
    <>
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <div className={classes.accountRoot}>
        <div className={classes.accountTop}>
          <Avatar
            className={classes.accountAvatar}
            src={profileUser && profileUser.photoUrl}
          />
          <Typography variant='h6'>
            {profileUser && profileUser.username}
          </Typography>
        </div>
        <div className={classes.accountBottom}>
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
          <Paper className={classes.tabPanel} elevation={1}>
            <DetailsTab
              updateProfileDetails={updateProfileDetails}
              profileUser={profileUser}
              classes={classes}
              tabIndex={0}
              activeTab={activeTab}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

Account.propTypes = {
  checkFetchOtherUser: PropTypes.func.isRequired
};

export default Account;
