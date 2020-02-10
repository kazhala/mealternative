/*
  container of the profile page
*/

// react
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProfileActions } from '../../Redux/profile';

// components
import Account from './Account';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

const AccountContainer = props => {
  const {
    clearError,
    getProfileDetails,
    userDetails,
    cleanUp,
    isAuthenticated,
    loading,
    loadingText,
    error
  } = props;
  // current tab
  const [activeTab, setActiveTab] = useState(0);

  // update active tab
  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  // get the query string if it exists (?id=xxx)
  const regexPattern = /^\?(\w+?)=(.*)/;
  const searchedUserId = props.location.search.match(regexPattern);

  // check if is looking at it's own profile or others profile
  const checkFetchOtherUser = useCallback(() => {
    if (searchedUserId) {
      return searchedUserId[1] === 'id' && searchedUserId[2];
    } else {
      return false;
    }
  }, [searchedUserId]);

  // fetch details for different tabs
  useEffect(() => {
    if (!isAuthenticated) return;
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
    isAuthenticated,
    activeTab,
    getProfileDetails,
    searchedUserId,
    checkFetchOtherUser,
    userDetails
  ]);

  // clean up on unmount
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      {/* if is not looking at others and is not login, redirect */}
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <PageSpinner loading={loading} text={loadingText} />
      <ErrorSnack error={error} handleClose={clearError} />
      <Account
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userDetails: state.Auth.user,
    profileUser: state.Profile.userDetails,
    detailLoading: state.Profile.detailLoading,
    loading: state.Profile.loading,
    loadingText: state.Profile.loadingText,
    error: state.Profile.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProfileDetails: ProfileActions.getProfileDetails,
      cleanUp: ProfileActions.cleanUp,
      clearError: ProfileActions.clearError,
      updateProfileDetails: ProfileActions.updateProfileDetails
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
