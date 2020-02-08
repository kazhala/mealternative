import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import useStyles from './Style';
import { Avatar, Typography } from '@material-ui/core';

const Account = props => {
  const { isAuthenticated, userDetails, checkFetchOtherUser } = props;
  const classes = useStyles();

  return (
    <>
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <div className={classes.accountRoot}>
        <div className={classes.accountTop}>
          <Avatar
            className={classes.accountAvatar}
            src={userDetails.photoUrl}
          />
          <Typography variant='h6'>{userDetails.username}</Typography>
          <Typography variant='caption'>{userDetails.email}</Typography>
        </div>
        <div>bottom part</div>
      </div>
    </>
  );
};

Account.propTypes = {
  checkFetchOtherUser: PropTypes.func.isRequired
};

export default Account;
