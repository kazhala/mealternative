import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide, Fab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import useStyles from './Style';
import ThumbNail from './_components/ThumbNail';
import TitleDes from './_components/TitleDes';
import MiscActions from './_components/MiscActions';

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
        <Fab
          color='primary'
          className={classes.detailCloseBtn}
          onClick={handleBack}
          variant='extended'
        >
          <ArrowBack />
          Back
        </Fab>
        <ThumbNail classes={classes} />
        <TitleDes classes={classes} />
        <MiscActions classes={classes} />
      </Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any
};

export default RecipeDetail;
