/*
  The recipe creation route
*/

// react
import React, { useState, useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateActions } from '../../../Redux/create';
import { UpdateActions } from '../../../Redux/update';

// components
import ErrorSnack from '../../../Common/ErrorModal/ErrorSnack';
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import Recipe from './Recipe';
import { Redirect } from 'react-router-dom';

// misc
import queryString from 'query-string';

const RecipeRoute = props => {
  const {
    history,
    error,
    categoryLoading,
    categoryList,
    getCategories,
    cleanUp,
    submitRecipe,
    success,
    loading,
    loadingText,
    location,
    getRecipeDetails,
    updateLoading,
    updateRecipe,
    updateError,
    updateClean,
    submitUpdateRecipe
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

  // determine if is update or create new
  const [isUpdate, setIsUpdate] = useState(false);

  // store the update Id into state
  useEffect(() => {
    const updateQuery = queryString.parse(location.search);
    if (updateQuery.id) {
      setIsUpdate(updateQuery.id);
    }
  }, [location]);

  // fetch the update recipe details
  useEffect(() => {
    if (isUpdate) {
      getRecipeDetails(isUpdate);
    }
  }, [isUpdate, getRecipeDetails]);

  // store the update info into state
  useEffect(() => {
    if (isUpdate && !updateLoading && updateRecipe._id) {
      setRecipeDetail(prevDetails => ({
        ...prevDetails,
        title: updateRecipe.title,
        description: updateRecipe.description,
        thumbnailImage: {
          ...prevDetails.thumbnailImage,
          url: updateRecipe.thumbImageUrl,
          previewUrl: updateRecipe.thumbImageUrl
        },
        ingredients: updateRecipe.ingredients,
        categories: [...updateRecipe.categories.map(category => category.name)],
        steps: [
          ...updateRecipe.steps.map(step => ({
            stepTitle: step.stepTitle,
            stepDescriptions: step.stepDescriptions,
            stepImage: {
              url: step.stepImageUrl,
              file: '',
              previewUrl: step.stepImageUrl
            }
          }))
        ]
      }));
    }
  }, [updateLoading, updateRecipe, isUpdate]);

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
    if (isUpdate) {
      submitUpdateRecipe(recipeDetail, selCategoryIds);
    } else {
      submitRecipe(recipeDetail, selCategoryIds);
    }
  };

  // fetch all categories from server on mount
  useEffect(() => {
    getCategories();
    return () => {
      // cleanup on unmount
      cleanUp();
    };
  }, [getCategories, cleanUp]);

  const handleClearError = () => {
    if (updateError === 'Did not find the matching recipe') {
      history.replace('/account?page=2');
    } else {
      cleanUp();
      updateClean();
    }
  };

  return (
    <>
      {success && <Redirect to='/' />}
      <ErrorSnack error={error || updateError} handleClose={handleClearError} />
      <PageSpinner
        background='rgba(0,0,0,0.4)'
        loading={loading || updateLoading}
        text={loadingText}
        textColor='#fff'
      />
      <Recipe
        isUpdate={isUpdate}
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
    error: state.Create.error,
    loading: state.Create.loading,
    success: state.Create.success,
    loadingText: state.Create.loadingText,
    updateLoading: state.Update.loading,
    updateError: state.Update.error,
    updateRecipe: state.Update.recipeDetails
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      getCategories: CreateActions.getCategories,
      cleanUp: CreateActions.cleanUp,
      submitRecipe: CreateActions.submitRecipe,
      getRecipeDetails: UpdateActions.getRecipeDetails,
      updateClean: UpdateActions.cleanUp,
      submitUpdateRecipe: UpdateActions.updateRecipe
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(RecipeRoute);
