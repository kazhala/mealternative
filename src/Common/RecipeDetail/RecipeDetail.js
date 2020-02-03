import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide, Button } from '@material-ui/core';
import useStyles from './Style';

const RecipeDetail = props => {
  const { handleBack, showModal } = props;
  const classes = useStyles();

  return (
    <Slide
      timeout={200}
      direction='left'
      in={showModal}
      mountOnEnter
      unmountOnExit
    >
      <Paper className={classes.detailRecipeRoot}>
        <Button onClick={handleBack}>Back</Button>
      </Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any
};

export default RecipeDetail;
