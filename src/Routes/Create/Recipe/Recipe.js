import React from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  TextField,
  Typography,
  Avatar
} from '@material-ui/core';
import { Title, Description } from '@material-ui/icons';
import ImageOption from '../_components/ImageOption';
import Ingredients from './_components/Ingredients';
import Steps from './_components/Steps';
import Categories from '../_components/Categories';
import useStyles from './Style';

const Recipe = props => {
  const classes = useStyles();
  const {
    categoryList,
    categoryLoading,
    recipeDetail,
    handleDetailChange
  } = props;
  const {
    title,
    description,
    thumbnailImage,
    ingredients,
    categories,
    steps
  } = recipeDetail;

  return (
    <div className={classes.routeRoot}>
      <Typography className={classes.routeTitle} component='div' variant='h6'>
        Create new recipe
      </Typography>
      {thumbnailImage.previewUrl && (
        <Avatar
          variant='square'
          className={classes.thumbPreview}
          src={thumbnailImage.previewUrl}
          alt='thumbnail preview'
        />
      )}
      <ImageOption
        urlText='Thumbnail Url'
        fileText='Thumbnail'
        classes={classes}
        handleDetailChange={handleDetailChange}
        thumbnailImage={thumbnailImage}
      />

      <TextField
        size='small'
        placeholder='Title of your recipe'
        variant='outlined'
        label='Title'
        value={title}
        onChange={e => handleDetailChange('title', e.target.value)}
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Title />
            </InputAdornment>
          )
        }}
      />
      <TextField
        size='small'
        placeholder='Description of your recipe'
        variant='outlined'
        label='Description'
        multiline
        rows={3}
        value={description}
        onChange={e => handleDetailChange('description', e.target.value)}
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Description />
            </InputAdornment>
          )
        }}
      />

      <Ingredients
        classes={classes}
        ingredients={ingredients}
        handleDetailChange={handleDetailChange}
      />
      <Categories
        classes={classes}
        categories={categories}
        handleDetailChange={handleDetailChange}
        categoryList={categoryList}
        categoryLoading={categoryLoading}
      />
      <Steps
        handleDetailChange={handleDetailChange}
        steps={steps}
        classes={classes}
      />
    </div>
  );
};

Recipe.propTypes = {
  categoryList: PropTypes.array.isRequired,
  categoryLoading: PropTypes.bool.isRequired,
  recipeDetail: PropTypes.object.isRequired,
  handleDetailChange: PropTypes.func.isRequired
};

export default Recipe;
