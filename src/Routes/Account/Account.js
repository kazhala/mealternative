import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import useStyles from './Style';

const Account = props => {
  const { isAuthenticated, userDetails, checkFetchOtherUser } = props;
  const classes = useStyles();

  return (
    <>
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <div className={classes.accountRoot}>
        Account
        {/* adsfadsafs */}
      </div>
    </>
  );
};

Account.propTypes = {
  checkFetchOtherUser: PropTypes.func.isRequired
};

export default Account;
