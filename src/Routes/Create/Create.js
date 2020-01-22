import React from 'react';
import useStyles from './Style';
import DefaultRoute from './_components/DefaultRoute';
import MealRoute from './_components/MealRoute';
import RecipeRoute from './_components/RecipeRoute';
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
            <RecipeRoute
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
          render={props => <MealRoute {...props} classes={classes} />}
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
