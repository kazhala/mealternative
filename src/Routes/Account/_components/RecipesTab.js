/*
  Recipes tab
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import {
  ThumbUpOutlined,
  BookmarkBorder,
  Edit,
  DeleteForever
} from '@material-ui/icons';

const RecipesTab = props => {
  const {
    classes,
    recipes,
    recipesLoading,
    otherUserId,
    activeTab,
    tabIndex,
    handleRemoveRecipe,
    handleCardClick,
    handleEditRecipe
  } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner loading={recipesLoading} />
        {recipes.map((recipe, index) => (
          <Paper
            onClick={e => handleCardClick(1, `/account/${recipe._id}`)}
            elevation={2}
            className={classes.tabCard}
            key={index}
          >
            <img
              src={recipe.thumbImageUrl}
              alt={recipe.title}
              className={classes.cardThumb}
            />
            <div className={classes.cardRight}>
              <Typography variant='body1' className={classes.cardText}>
                {recipe.title}
              </Typography>
              <Typography variant='caption' className={classes.cardText}>
                {recipe.description}
              </Typography>
              {otherUserId ? (
                <>
                  <div className={classes.cardMisc}>
                    <Rating
                      size='small'
                      precision={0.1}
                      value={recipe.rating}
                      readOnly
                    />
                    ({recipe.rating})
                  </div>
                  <div className={classes.cardMisc}>
                    <ThumbUpOutlined fontSize='small' />
                    {recipe.likes}
                    <BookmarkBorder fontSize='small' />
                    {recipe.bookmarks}
                  </div>
                </>
              ) : (
                <div className={classes.recipeAction}>
                  <IconButton onClick={e => handleEditRecipe(e, recipe._id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={e => handleRemoveRecipe(e, recipe._id)}>
                    <DeleteForever />
                  </IconButton>
                </div>
              )}
            </div>
          </Paper>
        ))}
      </div>
    )
  );
};

RecipesTab.propTypes = {
  classes: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  recipesLoading: PropTypes.bool.isRequired,
  otherUserId: PropTypes.any,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  handleRemoveRecipe: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleEditRecipe: PropTypes.func.isRequired
};

export default RecipesTab;
