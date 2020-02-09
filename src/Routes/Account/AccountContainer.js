import React, { useState, useEffect } from 'react';
import Account from './Account';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProfileActions } from '../../Redux/profile';

const AccountContainer = props => {
  const { getProfileDetails } = props;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (activeTab) {
      case 0:
        getProfileDetails();
        break;
      default:
        console.log('wrong');
    }
  }, [activeTab, getProfileDetails]);

  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  const regexPattern = /^\?(\w+?)=(.*)/;
  const searchedUserId = props.location.search.match(regexPattern);

  const checkFetchOtherUser = () => {
    if (searchedUserId) {
      return searchedUserId[1] === 'id' && searchedUserId[2];
    } else {
      return false;
    }
  };

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
    userDetails: state.Auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProfileDetails: ProfileActions.getProfileDetails
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
