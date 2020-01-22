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
    isAuthenticated: state.Auth.isAuthenticated,
    categoryList: state.Create.categories,
    categoryLoading: state.Create.categoryLoading,
    error: state.Create.error
  };
};

const mapDispatchTopProps = dispatch => {
  return bindActionCreators(
    {
      getCategories: CreateActions.getCategories,
      cleanUp: CreateActions.cleanUp
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchTopProps)(CreateContainer);
