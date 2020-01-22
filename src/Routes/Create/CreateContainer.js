import React from 'react';
import Create from './Create';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateActions } from '../../Redux/create';

const CreateContainer = props => {
  return <Create {...props} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      getCategories: CreateActions.getCategories
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(CreateContainer);
