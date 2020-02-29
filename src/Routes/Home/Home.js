/*
  Home page of mealternative
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

const Home = props => {
  const { categories } = props;

  return <div>Home</div>;
};

Home.propTypes = {
  categories: PropTypes.array.isRequired
};

export default Home;
