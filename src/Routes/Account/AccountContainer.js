/*
  container of the profile page
*/

// react
import React, { useState, useEffect } from 'react';
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

// misc
import queryString from 'query-string';

const AccountContainer = props => {
  const {
    updatePassword,
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
    removeRecipe,
    location
  } = props;
  // current tab
  const [activeTab, setActiveTab] = useState(0);

  const [otherUserId, setOtherUserId] = useState(null);

  // update active tab
  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    // get the query string if it exists (?id=xxx)
    const pageQuery = queryString.parse(location.search);
    if (pageQuery.id) {
      setOtherUserId(pageQuery.id);
    }
    if (pageQuery.page) {
      setActiveTab(Number(pageQuery.page));
      if (pageQuery.id) {
        history.replace(`${location.pathname}?id=${pageQuery.id}`);
      } else {
        history.replace(location.pathname);
      }
    }
  }, [location, history]);

  // fetch details for different tabs
  useEffect(() => {
    if (!isAuthenticated) return;
    switch (activeTab) {
      case 0:
        if (otherUserId) {
          getProfileDetails(otherUserId);
        } else {
          getProfileDetails(userDetails._id);
        }
        break;
      case 1:
        if (otherUserId) {
          getProfileBookmarks(otherUserId);
        } else {
          getProfileBookmarks(userDetails._id);
        }
        break;
      case 2:
        if (otherUserId) {
          getProfileRecipes(otherUserId);
        } else {
          getProfileRecipes(userDetails._id);
        }
        break;
      case 3:
        console.log('Update password');
        break;
      default:
        console.log('wrong');
    }
  }, [
    isAuthenticated,
    activeTab,
    getProfileDetails,
    otherUserId,
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

  // confirm if user wants to remove the recipe
  const handleRemoveRecipe = (e, recipeId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      removeRecipe({ recipeId, userId: userDetails._id });
    }
  };

  // push to edit recipe
  const handleEditRecipe = (e, recipeId) => {
    e.stopPropagation();
    history.push(`/create/recipe?id=${recipeId}`);
  };

  // handle submit update password request
  const handleUpdatePassword = (e, password) => {
    e.preventDefault();
    updatePassword(password);
  };

  return (
    <>
      {/* if is not looking at others and is not login, redirect */}
      {!isAuthenticated && !otherUserId && <Redirect to='/' />}
      <PageSpinner loading={loading} text={loadingText} />
      <ErrorSnack error={error} handleClose={clearError} />
      <SuccessSnack message={infoMessage} handleClose={clearError} />
      <Account
        handleUpdatePassword={handleUpdatePassword}
        handleEditRecipe={handleEditRecipe}
        handleCardClick={handleCardClick}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        otherUserId={otherUserId}
        handleRemoveRecipe={handleRemoveRecipe}
        infoMessage={infoMessage}
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
      removeRecipe: ProfileActions.removeRecipe,
      updatePassword: ProfileActions.updatePassword
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
