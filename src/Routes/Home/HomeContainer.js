/*
  Container for the homepage
*/

// react
import React, { useEffect } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomeActions } from '../../Redux/home';

// components
import Home from './Home';

const HomeContainer = props => {
  const { getCategories } = props;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return <Home {...props} />;
};

const mapStateToProps = state => {
  return {
    loading: state.Home.loading,
    error: state.Home.error,
    categories: state.Home.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCategories: HomeActions.getCategories
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
