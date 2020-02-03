import React, { useEffect, useState } from 'react';
import RecipeDetail from './RecipeDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RecipeActions } from '../../Redux/recipe';

const RecipeDetailContainer = props => {
  const { match, history, getRecipeDetails, cleanUp } = props;
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

  return (
    <RecipeDetail showModal={showModal} handleBack={handleBack} {...props} />
  );
};

const mapStateToProps = state => {
  return {
    loading: state.Recipe.loading,
    error: state.Recipe.error,
    recipeDetails: state.Recipe.recipeDetails
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
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
