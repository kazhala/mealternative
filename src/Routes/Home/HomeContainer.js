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
import ErrorSnack from '../../Common/ErrorModal/ErrorSnack';
import PageSpinner from '../../Common/Spinner/PageSpinner';

const HomeContainer = props => {
  const { loading, getCategories, error, cleanUp, history } = props;

  useEffect(() => {
    getCategories();
    return () => {
      cleanUp();
    };
  }, [getCategories, cleanUp]);

  const handleClick = url => {
    history.push(url);
  };

  const handleCategoryClick = id => {
    history.push(`/category?id=${id}`);
  };

  return (
    <>
      <ErrorSnack error={error} handleClose={cleanUp} />
      <PageSpinner loading={loading} />
      <Home
        handleCategoryClick={handleCategoryClick}
        handleClick={handleClick}
        {...props}
      />
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
