/*
  Home page of mealternative
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import TopCard from './_components/TopCard';

// misc
import useStyles from './Style';

const Home = props => {
  const { categories, loading } = props;

  const classes = useStyles();

  return (
    <div className={classes.homeRoot}>
      <div className={classes.homeTop}>
        <TopCard
          classes={classes}
          title='Map'
          description='Checkout restaurants near you'
          imgUrl='https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?cs=srgb&dl=blur-cartography-close-up-concept-408503.jpg&fm=jpg'
        />
        <TopCard
          classes={classes}
          title='Recipes'
          description='Feel like cooking?'
          imgUrl='https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        />
        <TopCard
          classes={classes}
          title='Meals'
          description='Coming soon..'
          imgUrl='https://images.pexels.com/photos/5876/food-salad-healthy-vegetables.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        />
      </div>
      <div>categories</div>
    </div>
  );
};

Home.propTypes = {
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Home;
