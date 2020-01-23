/*
  The recipe creation route
*/

// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import {
  TextField,
  Typography,
  InputAdornment,
  Avatar
} from '@material-ui/core';
import { Title, Description } from '@material-ui/icons';
import ImageOption from './ImageOption';
import Ingredients from './Ingredients';
import Categories from './Categories';
import ErrorSnack from '../../../Common/ErrorModal/ErrorSnack';
import Steps from './Steps';

const RecipeRoute = props => {
  const {
    categoryList,
    classes,
    error,
    categoryLoading,
    getCategories,
    cleanUp
  } = props;
  const [recipeDetail, setRecipeDetail] = useState({
    title: '',
    description: '',
    thumbnailImage: {
      url: '',
      file: '',
      previewUrl: ''
    },
    ingredients: [],
    categories: [],
    steps: [
      {
        stepTitle: 'Step1',
        stepDescriptions: '',
        stepImage: { url: '', file: '', previewUrl: '' }
      }
    ]
  });
  const {
    title,
    description,
    thumbnailImage,
    ingredients,
    categories,
    steps
  } = recipeDetail;

  const handleDetailChange = (name, newValue) => {
    switch (name) {
      case 'thumbFile':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          thumbnailImage: {
            ...prevDetails.thumbnailImage,
            file: newValue,
            previewUrl: newValue ? window.URL.createObjectURL(newValue) : ''
          }
        }));
        break;
      case 'thumbUrl':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          thumbnailImage: {
            ...prevDetails.thumbnailImage,
            url: newValue,
            file: '',
            previewUrl: ''
          }
        }));
        break;
      case 'thumbUrlPreview':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          thumbnailImage: {
            ...prevDetails.thumbnailImage,
            previewUrl: prevDetails.thumbnailImage.url
          }
        }));
        break;

      case 'step':
        const { index, updateAttribute, newAttributeValue } = newValue;
        if (updateAttribute === 'stepImageFile') {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              ...prevDetails.steps.slice(0, index),
              {
                ...prevDetails.steps[index],
                stepImage: {
                  ...prevDetails.steps[index].stepImage,
                  file: newAttributeValue,
                  previewUrl: newAttributeValue
                    ? window.URL.createObjectURL(newAttributeValue)
                    : ''
                }
              },
              ...prevDetails.steps.slice(index + 1)
            ]
          }));
        } else if (updateAttribute === 'stepImageUrl') {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              ...prevDetails.steps.slice(0, index),
              {
                ...prevDetails.steps[index],
                stepImage: {
                  ...prevDetails.steps[index].stepImage,
                  url: newAttributeValue,
                  previewUrl: newAttributeValue,
                  file: ''
                }
              },
              ...prevDetails.steps.slice(index + 1)
            ]
          }));
        } else {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              ...prevDetails.steps.slice(0, index),
              {
                ...prevDetails.steps[index],
                [updateAttribute]: newAttributeValue
              },
              ...prevDetails.steps.slice(index + 1)
            ]
          }));
        }
        break;

      default:
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          [name]: newValue
        }));
        break;
    }
  };

  useEffect(() => {
    getCategories();
    return () => {
      cleanUp();
    };
  }, [getCategories, cleanUp]);

  console.log(recipeDetail);

  return (
    <>
      <ErrorSnack error={error} handleClose={cleanUp} />
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
    </>
  );
};

RecipeRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecipeRoute;
