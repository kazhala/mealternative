import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide } from '@material-ui/core';

const RecipeDetail = props => {
  // const { recipeDetails } = props;

  return (
    <Slide direction='left' in={true} mountOnEnter unmountOnExit>
      <Paper>hello</Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any
};

export default RecipeDetail;
