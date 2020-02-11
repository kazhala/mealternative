/*
  Recipes tab
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import PageSpinner from '../../../Common/Spinner/PageSpinner';

const RecipesTab = props => {
  const {
    classes,
    recipes,
    recipesLoading,
    checkFetchOtherUser,
    activeTab,
    tabIndex
  } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner loading={recipesLoading} />
        {recipes.map((recipe, index) => (
          <div key={index}>hello</div>
        ))}
      </div>
    )
  );
};

RecipesTab.propTypes = {
  classes: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  recipesLoading: PropTypes.bool.isRequired,
  checkFetchOtherUser: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired
};

export default RecipesTab;
