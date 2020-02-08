import React from 'react';
import Account from './Account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AccountContainer = props => {
  const regexPattern = /^\?(\w+?)=(.*)/;
  const searchedUserId = props.location.search.match(regexPattern);

  const checkFetchOtherUser = () => {
    if (searchedUserId) {
      return searchedUserId[1] === 'id' && searchedUserId[2];
    } else {
      return false;
    }
  };

  return <Account checkFetchOtherUser={checkFetchOtherUser} {...props} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userDetails: state.Auth.user
  };
};

const mapDispatchToProps = dispatch => {
  //
};

export default connect(mapStateToProps, null)(AccountContainer);
