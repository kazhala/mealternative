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
import SuccessSnack from '../../Common/InfoModal/SuccessSnack';

const AccountContainer = props => {
  const {
    infoMessage,
    clearError,
    getProfileDetails,
    userDetails,
    cleanUp,
    isAuthenticated,
    loading,
    loadingText,
    error,
    getProfileBookmarks,
    history,
    getProfileRecipes,
    removeRecipe
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
      case 1:
        if (!checkFetchOtherUser()) {
          getProfileBookmarks();
        }
        break;
      case 2:
        if (checkFetchOtherUser()) {
          getProfileRecipes(searchedUserId[2]);
        } else {
          getProfileRecipes(userDetails._id);
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
    userDetails,
    getProfileBookmarks,
    getProfileRecipes
  ]);

  // clean up on unmount
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  // handle card click to get the recipe modal in (see common/DetailRecipe)
  // [1, 2] matches tab index
  // 1 is bookmark 2 is recipe tab
  const handleCardClick = (type, url) => {
    if (type === 1) {
      history.push(url);
    }
  };

  const handleRemoveRecipe = (e, recipeId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      removeRecipe(recipeId);
    }
  };

  return (
    <>
      {/* if is not looking at others and is not login, redirect */}
      {!isAuthenticated && !checkFetchOtherUser() && <Redirect to='/' />}
      <PageSpinner loading={loading} text={loadingText} />
      <ErrorSnack error={error} handleClose={clearError} />
      <SuccessSnack message={infoMessage} handleClose={clearError} />
      <Account
        handleCardClick={handleCardClick}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        checkFetchOtherUser={checkFetchOtherUser}
        handleRemoveRecipe={handleRemoveRecipe}
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
    error: state.Profile.error,
    bookmarks: state.Profile.bookmarks,
    bookmarksLoading: state.Profile.bookmarksLoading,
    recipesLoading: state.Profile.recipesLoading,
    recipes: state.Profile.recipes,
    infoMessage: state.Profile.info
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProfileDetails: ProfileActions.getProfileDetails,
      cleanUp: ProfileActions.cleanUp,
      clearError: ProfileActions.clearError,
      updateProfileDetails: ProfileActions.updateProfileDetails,
      getProfileBookmarks: ProfileActions.getProfileBookmarks,
      getProfileRecipes: ProfileActions.getProfileRecipes,
      removeRecipe: ProfileActions.removeRecipe
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
