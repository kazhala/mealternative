import React from 'react';
import Create from './Create';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

const CreateContainer = props => {
  return <Create {...props} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(CreateContainer);
