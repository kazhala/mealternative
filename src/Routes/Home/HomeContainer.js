/*
  Container for the homepage
*/

// react
import React from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Home from './Home';

const HomeContainer = props => {
  return <Home {...props} />;
};

export default HomeContainer;
