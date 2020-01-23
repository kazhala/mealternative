import React from 'react';
import useStyles from './Style';
import DefaultRoute from './_components/DefaultRoute';
import RecipeContainer from './Recipe/RecipeContainer';
import MealContainer from './Meal/MealContainer';
import { Switch, Route, Redirect } from 'react-router-dom';

const Create = props => {
  const {
    error,
    categoryLoading,
    categoryList,
    cleanUp,
    isAuthenticated,
    getCategories
  } = props;
  const classes = useStyles();

  return (
    <>
      {!isAuthenticated && <Redirect to='/signin' />}
      <Switch>
        <Route
          path='/create/recipe'
          render={props => (
            <RecipeContainer
              error={error}
              getCategories={getCategories}
              categoryList={categoryList}
              cleanUp={cleanUp}
              {...props}
              classes={classes}
              categoryLoading={categoryLoading}
            />
          )}
        />
        <Route
          path='/create/meal'
          render={props => <MealContainer {...props} classes={classes} />}
        />
        <Route
          path='/create'
          render={props => <DefaultRoute {...props} classes={classes} />}
        />
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default Create;
