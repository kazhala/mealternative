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
    incrementBook
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

  const handleLikeAction = () => {
    if (!isAuthenticated) {
      history.push('/signin');
    } else {
      incrementLike();
    }
  };

  const handleBookAction = () => {
    if (!isAuthenticated) {
      history.push('/signin');
    } else {
      incrementBook();
    }
  };

  return (
    <RecipeDetail
      handleLikeAction={handleLikeAction}
      handleBookAction={handleBookAction}
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
