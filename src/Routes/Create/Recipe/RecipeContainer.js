/*
  The recipe creation route
*/

// react
import React, { useState, useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateActions } from '../../../Redux/create';

// components
import ErrorSnack from '../../../Common/ErrorModal/ErrorSnack';
import Recipe from './Recipe';

const RecipeRoute = props => {
  const {
    error,
    categoryLoading,
    categoryList,
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

  const handleDetailChange = (name, newValue) => {
    switch (name) {
      case 'thumbFile':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          thumbnailImage: {
            ...prevDetails.thumbnailImage,
            file: newValue,
            previewUrl: newValue ? window.URL.createObjectURL(newValue) : '',
            url: ''
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

      case 'addStep':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          steps: [
            ...prevDetails.steps.slice(0, newValue + 1),
            {
              stepTitle: '',
              stepDescriptions: '',
              stepImage: { url: '', file: '', previewUrl: '' }
            },
            ...prevDetails.steps.slice(newValue + 1)
          ]
        }));
        break;
      case 'removeStep':
        setRecipeDetail(prevDetails => {
          const newSteps = [...prevDetails.steps];
          newSteps.splice(newValue, 1);
          return {
            ...prevDetails,
            steps: [...newSteps]
          };
        });
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
                    : '',
                  url: newAttributeValue ? newAttributeValue.name : ''
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
        } else if (updateAttribute === 'clearFile') {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              ...prevDetails.steps.slice(0, index),
              {
                ...prevDetails.steps[index],
                stepImage: {
                  ...prevDetails.steps[index].stepImage,
                  file: '',
                  previewUrl: '',
                  url: ''
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
      <Recipe
        recipeDetail={recipeDetail}
        categoryList={categoryList}
        categoryLoading={categoryLoading}
        handleDetailChange={handleDetailChange}
        {...props}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    categoryList: state.Create.categories,
    categoryLoading: state.Create.categoryLoading,
    error: state.Create.error
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      getCategories: CreateActions.getCategories,
      cleanUp: CreateActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipeRoute);
