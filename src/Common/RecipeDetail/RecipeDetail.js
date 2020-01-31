import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide } from '@material-ui/core';
import useStyles from './Style';

const RecipeDetail = props => {
  // const { recipeDetails } = props;
  const classes = useStyles();

  return (
    <Slide timeout={1000} direction='left' in={true} mountOnEnter unmountOnExit>
      <Paper className={classes.detailRecipeRoot}>hello</Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any
};

export default RecipeDetail;
