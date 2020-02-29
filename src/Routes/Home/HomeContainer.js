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
import PageSpinner from '../../Common/Spinner/PageSpinner';
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';

const HomeContainer = props => {
  const { getCategories, loading, error, cleanUp } = props;

  useEffect(() => {
    getCategories();
    return () => {
      cleanUp();
    };
  }, [getCategories, cleanUp]);

  return (
    <>
      <PageSpinner loading={loading} />
      <ErrorSnack error={error} handleClose={cleanUp} />
      <Home {...props} />
    </>
  );
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
      getCategories: HomeActions.getCategories,
      cleanUp: HomeActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
