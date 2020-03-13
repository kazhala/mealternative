/*
  The modal to display details of a recipe
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography, Slide, Fab, Avatar, Dialog } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ThumbNail from './_components/ThumbNail';
import MiscActions from './_components/MiscActions';
import ListsCatIng from './_components/ListsCatIng';
import Steps from './_components/Steps';
import ErrorSnack from '../ErrorModal/ErrorSnack';
import SuccessSnack from '../InfoModal/SuccessSnack';

// misc
import useStyles from './Style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide timeout={200} direction='left' ref={ref} {...props} />;
});

const RecipeDetail = props => {
  const {
    handleCategoryClick,
    handleLikeAction,
    handleBack,
    showModal,
    loading,
    cleanUp,
    error,
    recipeDetails,
    handleBookAction,
    handleRateAction,
    message,
    history
  } = props;
  const classes = useStyles();

  const {
    likes,
    bookmarks,
    ingredients,
    categories,
    rating,
    postedBy,
    thumbImageUrl,
    title,
    description,
    steps,
    liked,
    booked
  } = recipeDetails;

  return (
    <Dialog
      fullScreen
      open={showModal}
      onClose={handleBack}
      TransitionComponent={Transition}
    >
      <div className={classes.detailRecipeRoot}>
        {/* put loading and error inside the slider */}
        <ErrorSnack error={error} handleClose={cleanUp} />
        <SuccessSnack message={message} handleClose={cleanUp} />

        {/* go back button */}
        <Fab
          color='primary'
          className={classes.detailCloseBtn}
          onClick={handleBack}
          variant='extended'
        >
          <ArrowBack />
          Back
        </Fab>

        {/* if loading finish and data is fetched */}
        {!loading && postedBy && (
          <>
            <Avatar
              onClick={() => history.push(`/account?id=${postedBy._id}`)}
              src={postedBy.photoUrl}
              className={classes.detailAvatar}
            />
            <ThumbNail imgUrl={thumbImageUrl} classes={classes} />
            <div className={classes.detailBody}>
              <Typography
                className={classes.detailTitle}
                variant='h4'
                component='div'
              >
                {title}
              </Typography>
              <Typography
                variant='caption'
                component='div'
                className={classes.detailTitle}
              >
                {description}
              </Typography>

              {/* like bookmark rating etc */}
              <MiscActions
                handleRateAction={handleRateAction}
                handleLikeAction={handleLikeAction}
                handleBookAction={handleBookAction}
                likes={likes}
                bookmarks={bookmarks}
                rating={rating}
                classes={classes}
                liked={liked}
                booked={booked}
              />
              <ListsCatIng
                handleCategoryClick={handleCategoryClick}
                ingredients={ingredients}
                categories={categories}
                classes={classes}
              />

              {/* recipe steps */}
              <Steps steps={steps} classes={classes} />
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

RecipeDetail.propTypes = {
  handleLikeAction: PropTypes.func.isRequired,
  handleBookAction: PropTypes.func.isRequired,
  handleRateAction: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default RecipeDetail;
