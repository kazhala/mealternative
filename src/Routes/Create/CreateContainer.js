/*
  Create container
  contains nested routes for create recipe and meal
*/

// react
import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import Create from './Create';

const CreateContainer = props => {
  return <Create {...props} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(CreateContainer);
