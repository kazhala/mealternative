import React, { useState, useEffect, useCallback } from 'react';
import Account from './Account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProfileActions } from '../../Redux/profile';
import { Redirect } from 'react-router-dom';
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

const AccountContainer = props => {
  const {
    getProfileDetails,
    userDetails,
    cleanUp,
    isAuthenticated,
    loading,
    loadingText,
    error
  } = props;
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

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <>
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <PageSpinner loading={loading} text={loadingText} />
      <ErrorSnack error={error} handleClose={cleanUp} />
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
      updateProfileDetails: ProfileActions.updateProfileDetails
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
