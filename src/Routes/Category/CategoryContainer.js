/*
  Category route container
  display all recipes related to a category
*/

// react
import React, { useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// misc
import queryString from 'query-string';

const CategoryContainer = props => {
  const { location, history } = props;

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    if (!queryParams.id) {
      history.replace('/');
    }
  }, [location, history]);

  return <div>CategoryContainer</div>;
};

export default CategoryContainer;
