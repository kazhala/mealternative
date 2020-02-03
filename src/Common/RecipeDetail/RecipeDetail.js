import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slide, Fab, Avatar } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import useStyles from './Style';
import ThumbNail from './_components/ThumbNail';
import TitleDes from './_components/TitleDes';
import MiscActions from './_components/MiscActions';
import ListsCatIng from './_components/ListsCatIng';
import Steps from './_components/Steps';
import PageSpinner from '../Spinner/PageSpinner';
import ErrorSnack from '../ErrorModal/ErrorSnack';

const RecipeDetail = props => {
  const { handleBack, showModal, loading, cleanUp, error } = props;
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
        <PageSpinner loading={loading} />
        <ErrorSnack error={error} handleClose={cleanUp} />
        {!loading && (
          <>
            <Fab
              color='primary'
              className={classes.detailCloseBtn}
              onClick={handleBack}
              variant='extended'
            >
              <ArrowBack />
              Back
            </Fab>
            <Avatar className={classes.detailAvatar}>K</Avatar>
            <ThumbNail classes={classes} />
            <TitleDes classes={classes} />
            <MiscActions classes={classes} />
            <ListsCatIng classes={classes} />
            <Steps classes={classes} />
          </>
        )}
      </Paper>
    </Slide>
  );
};

RecipeDetail.propTypes = {
  recipeDetails: PropTypes.any
};

export default RecipeDetail;
