import React, { useEffect, useState } from 'react';
import RecipeDetail from './RecipeDetail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RecipeActions } from '../../Redux/recipe';

const RecipeDetailContainer = props => {
  const { match, history, getRecipeDetails } = props;
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

  return (
    <RecipeDetail showModal={showModal} handleBack={handleBack} {...props} />
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getRecipeDetails: RecipeActions.fetchRecipeDetails
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(RecipeDetailContainer);
