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
    cleanUp,
    submitRecipe
  } = props;

  // states for the recipe
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

  // reorder the array helper function
  const reOrderArray = (arr, from, to) => {
    return arr.reduce((prev, current, idx, self) => {
      if (from === to) {
        prev.push(current);
      }
      if (idx === from) {
        return prev;
      }
      if (from < to) {
        prev.push(current);
      }
      if (idx === to) {
        prev.push(self[from]);
      }
      if (from > to) {
        prev.push(current);
      }
      return prev;
    }, []);
  };

  // update state handler
  // spreading the object or arrays to prevent manipulation of the states
  const handleDetailChange = (name, newValue) => {
    switch (name) {
      case 'thumbFile':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          thumbnailImage: {
            ...prevDetails.thumbnailImage,
            file: newValue,
            // create a new previewUrl
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
            // clears the file image information
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

      // add a step into the recipe
      case 'addStep':
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          steps: [
            // make a copy of the original step array
            // put the step into the given index
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
      // remove a step from the step array
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

      // update the order of the step array
      // orderType = 0 | 1
      // 0 === 'move up', 1 === 'move down'
      case 'reOrderStep':
        const { reOrderIndex, reOrderType } = newValue;
        if (reOrderType === 0) {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              // using the helper function to reorder
              ...reOrderArray(prevDetails.steps, reOrderIndex, reOrderIndex - 1)
            ]
          }));
        } else if (reOrderType === 1) {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              ...reOrderArray(prevDetails.steps, reOrderIndex, reOrderIndex + 1)
            ]
          }));
        }
        break;

      // updating individual step information
      case 'step':
        const { index, updateAttribute, newAttributeValue } = newValue;
        // handle image upload
        if (updateAttribute === 'stepImageFile') {
          setRecipeDetail(prevDetails => ({
            ...prevDetails,
            steps: [
              // edit the according step object inside the step array
              ...prevDetails.steps.slice(0, index),
              {
                ...prevDetails.steps[index],
                stepImage: {
                  ...prevDetails.steps[index].stepImage,
                  file: newAttributeValue,
                  // generate temp url for preview
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
          // clears the file information
          // edit the according step object
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
          // clears the file and url
          // edit the according step object
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
          // if it's not image related, update the according step object attribute
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

      // default state update
      default:
        setRecipeDetail(prevDetails => ({
          ...prevDetails,
          [name]: newValue
        }));
        break;
    }
  };

  const handleRecipeSubmit = () => {
    const selCategoryIds = categoryList.reduce((prev, curr, idx, self) => {
      recipeDetail.categories.forEach(category => {
        if (category === curr.name) {
          prev.push(curr._id);
        }
      });
      return prev;
    }, []);
    submitRecipe(recipeDetail, selCategoryIds);
  };

  // fetch all categories from server on mount
  useEffect(() => {
    getCategories();
    return () => {
      // cleanup on unmount
      cleanUp();
    };
  }, [getCategories, cleanUp]);

  return (
    <>
      <ErrorSnack error={error} handleClose={cleanUp} />
      <Recipe
        recipeDetail={recipeDetail}
        categoryList={categoryList}
        categoryLoading={categoryLoading}
        handleDetailChange={handleDetailChange}
        handleRecipeSubmit={handleRecipeSubmit}
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
      cleanUp: CreateActions.cleanUp,
      submitRecipe: CreateActions.submitRecipe
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipeRoute);
