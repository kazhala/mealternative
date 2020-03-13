/*
  container of the profile page
*/

// react
import React, { useState, useEffect, useRef, useCallback } from 'react';

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
    location,
    loadMoreRecipes,
    loadMoreBookmarks,
    hasNextPage
  } = props;

  // current tab
  const [activeTab, setActiveTab] = useState(0);
  // check if is on other user's profile page
  const [otherUserId, setOtherUserId] = useState(null);
  // check if the page should be able to load more
  const [isLoadable, setIsLoadable] = useState(true);

  // scroll to top on tab change
  const tabTopEleRef = useRef(null);

  // update active tab
  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (location.pathname === '/account') {
      setIsLoadable(true);
    } else {
      setIsLoadable(false);
    }
  }, [location]);

  useEffect(() => {
    // get the query string if it exists (?id=xxx)
    const pageQuery = queryString.parse(location.search);
    if (!isAuthenticated && !pageQuery.id) history.replace('/');
    if (pageQuery.id) {
      // if is user itself, don't set to other user profile
      if (pageQuery.id === userDetails._id) {
        if (pageQuery.page) {
          // replace the search queryString once processed
          setActiveTab(Number(pageQuery.page));
          history.replace(location.pathname);
        } else {
          setActiveTab(0);
          history.replace(location.pathname);
        }
      } else {
        setOtherUserId(pageQuery.id);
        if (activeTab === 2) {
          setActiveTab(0);
        }
      }
    } else if (pageQuery.page) {
      // replace the search queryString once processed
      setActiveTab(Number(pageQuery.page));
      history.replace(location.pathname);
    }
  }, [location, history, userDetails, isAuthenticated, activeTab]);

  const scrollToTop = useCallback(() => {
    tabTopEleRef.current.scrollTo(0, 0);
  }, []);

  // fetch details for different tabs
  useEffect(() => {
    switch (activeTab) {
      case 0:
        if (otherUserId) {
          getProfileDetails(otherUserId);
        } else {
          getProfileDetails(userDetails._id);
        }
        break;
      case 1:
        scrollToTop();
        if (otherUserId) {
          getProfileRecipes(otherUserId);
        } else {
          getProfileRecipes(userDetails._id);
        }
        break;
      case 2:
        scrollToTop();
        getProfileBookmarks(userDetails._id);
        break;
      case 3:
        console.log('Update password');
        break;
      default:
        console.log('wrong');
    }
  }, [
    scrollToTop,
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
  const handleCardClick = url => {
    if (otherUserId) {
      history.push({
        pathname: url,
        search: `?id=${otherUserId}`,
        state: { url: '/account' }
      });
    } else {
      history.push({ pathname: url, state: { url: '/account' } });
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

  const handleLoadMore = () => {
    switch (activeTab) {
      case 1:
        if (otherUserId) {
          loadMoreRecipes(otherUserId);
        } else {
          loadMoreRecipes(userDetails._id);
        }
        break;
      case 2:
        loadMoreBookmarks(userDetails._id);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <PageSpinner loading={loading} text={loadingText} />
      <ErrorSnack error={error} handleClose={clearError} />
      <SuccessSnack message={infoMessage} handleClose={clearError} />
      <Account
        hasNextPage={hasNextPage}
        tabTopEleRef={tabTopEleRef}
        isLoadable={isLoadable}
        handleLoadMore={handleLoadMore}
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
    infoMessage: state.Profile.info,
    hasNextPage: state.Profile.hasNextPage
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
      updatePassword: ProfileActions.updatePassword,
      loadMoreRecipes: ProfileActions.loadMoreRecipes,
      loadMoreBookmarks: ProfileActions.loadMoreBookmarks
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
