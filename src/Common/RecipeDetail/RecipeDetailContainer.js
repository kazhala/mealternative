import React, { useEffect, useState } from 'react';
import RecipeDetail from './RecipeDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RecipeActions } from '../../Redux/recipe';

const RecipeDetailContainer = props => {
  const {
    isAuthenticated,
    match,
    history,
    getRecipeDetails,
    cleanUp,
    incrementLike,
    incrementBook,
    updateRecipeRating
  } = props;
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!mounted) {
      console.log(match.params);
      setMounted(true);
      getRecipeDetails(match.params);
    }
  }, [match, mounted, getRecipeDetails]);

  const handleBack = () => {
    setShowModal(false);
    setTimeout(() => {
      history.push('/recipes');
    }, 200);
  };

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const checkAuthentication = () => {
    if (!isAuthenticated) {
      history.push('/signin');
    }
  };

  const handleLikeAction = () => {
    checkAuthentication();
    incrementLike();
  };

  const handleBookAction = () => {
    checkAuthentication();
    incrementBook();
  };

  const handleRateAction = newRating => {
    checkAuthentication();
    updateRecipeRating(newRating);
  };

  return (
    <RecipeDetail
      handleLikeAction={handleLikeAction}
      handleBookAction={handleBookAction}
      handleRateAction={handleRateAction}
      showModal={showModal}
      handleBack={handleBack}
      {...props}
    />
  );
};

const mapStateToProps = state => {
  return {
    loading: state.Recipe.loading,
    error: state.Recipe.error,
    recipeDetails: state.Recipe.recipeDetails,
    isAuthenticated: state.Auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateRecipeRating: RecipeActions.updateRecipeRating,
      incrementBook: RecipeActions.incrementBook,
      incrementLike: RecipeActions.incrementLike,
      getRecipeDetails: RecipeActions.fetchRecipeDetails,
      cleanUp: RecipeActions.cleanUp
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetailContainer);
