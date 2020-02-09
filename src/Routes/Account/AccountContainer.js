import React, { useState, useEffect, useCallback } from 'react';
import Account from './Account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProfileActions } from '../../Redux/profile';

const AccountContainer = props => {
  const { getProfileDetails, userDetails, cleanUp } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  const regexPattern = /^\?(\w+?)=(.*)/;
  const searchedUserId = props.location.search.match(regexPattern);

  const checkFetchOtherUser = useCallback(() => {
    if (searchedUserId) {
      return searchedUserId[1] === 'id' && searchedUserId[2];
    } else {
      return false;
    }
  }, [searchedUserId]);

  useEffect(() => {
    switch (activeTab) {
      case 0:
        if (checkFetchOtherUser()) {
          getProfileDetails(searchedUserId[2]);
        } else {
          getProfileDetails(userDetails._id);
        }
        break;
      default:
        console.log('wrong');
    }
  }, [
    activeTab,
    getProfileDetails,
    searchedUserId,
    checkFetchOtherUser,
    userDetails
  ]);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Account
      activeTab={activeTab}
      handleTabChange={handleTabChange}
      checkFetchOtherUser={checkFetchOtherUser}
      {...props}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userDetails: state.Auth.user,
    profileUser: state.Profile.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProfileDetails: ProfileActions.getProfileDetails,
      cleanUp: ProfileActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
