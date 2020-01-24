/*
  The greetings page for create
  contains nested routes for recipe and meal
*/

// react
import React from 'react';

// components
import { Switch, Route, Redirect } from 'react-router-dom';
import DefaultRoute from './_components/DefaultRoute';
import RecipeContainer from './Recipe/RecipeContainer';
import MealContainer from './Meal/MealContainer';
import useStyles from './Style';

const Create = props => {
  const { isAuthenticated } = props;
  const classes = useStyles();

  return (
    <>
      {/* direct to signin if not auth */}
      {!isAuthenticated && <Redirect to='/signin' />}
      <Switch>
        <Route
          path='/create/recipe'
          render={props => <RecipeContainer {...props} />}
        />
        <Route
          path='/create/meal'
          render={props => <MealContainer {...props} />}
        />
        <Route
          path='/create'
          render={props => <DefaultRoute {...props} classes={classes} />}
        />
        {/* redirect to homepage if url is random */}
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default Create;
