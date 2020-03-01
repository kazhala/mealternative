/*
  Recipe component to display the create recipe page
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import {
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Button,
  Fab
} from '@material-ui/core';
import { Title, Description, Send, ArrowBack } from '@material-ui/icons';
import ImageOption from '../_components/ImageOption';
import Ingredients from './_components/Ingredients';
import Steps from './_components/Steps';
import Categories from '../_components/Categories';

// misc
import useStyles from './Style';

const Recipe = props => {
  const classes = useStyles();
  const {
    categoryList,
    categoryLoading,
    recipeDetail,
    handleDetailChange,
    handleRecipeSubmit,
    isUpdate,
    handleUpdateGoBack
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
      <div className={classes.root}>
        {isUpdate && (
          <Fab
            color='primary'
            className={classes.updateGoBack}
            onClick={handleUpdateGoBack}
            variant='extended'
          >
            <ArrowBack />
            Back
          </Fab>
        )}
        {/* title */}
        <Typography className={classes.routeTitle} component='div' variant='h6'>
          {isUpdate ? 'Update recipe' : 'Create new recipe'}
        </Typography>
        {/* thumbnailImage preview using material ui avatar */}
        {thumbnailImage.previewUrl && (
          <Avatar
            variant='square'
            className={classes.thumbPreview}
            src={thumbnailImage.previewUrl}
            alt='thumbnail preview'
          />
        )}
        {/* allow user to choose between url or upload file */}
        <ImageOption
          urlText='Thumbnail Url'
          fileText='Thumbnail'
          classes={classes}
          handleDetailChange={handleDetailChange}
          thumbnailImage={thumbnailImage}
        />

        {/* title input */}
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
        {/* description input */}
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

        {/* ingredients auto complete */}
        <Ingredients
          classes={classes}
          ingredients={ingredients}
          handleDetailChange={handleDetailChange}
        />
        {/* categories auto complete */}
        <Categories
          classes={classes}
          categories={categories}
          handleDetailChange={handleDetailChange}
          categoryList={categoryList}
          categoryLoading={categoryLoading}
        />
        {/* steps */}
        <Steps
          handleDetailChange={handleDetailChange}
          steps={steps}
          classes={classes}
        />

        <Button
          color='primary'
          variant='contained'
          fullWidth
          className={classes.recipeSubmit}
          endIcon={<Send />}
          onClick={handleRecipeSubmit}
        >
          {isUpdate ? 'Update' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  categoryList: PropTypes.array.isRequired,
  categoryLoading: PropTypes.bool.isRequired,
  recipeDetail: PropTypes.object.isRequired,
  handleDetailChange: PropTypes.func.isRequired,
  handleRecipeSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  handleUpdateGoBack: PropTypes.func.isRequired
};

export default Recipe;
