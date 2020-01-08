import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const AccountActivate = props => {
  const { activate, loading, success, error, match } = props;
  useEffect(() => {
    activate(match.params.token);
  }, [match, activate]);

  return <div>{props.match.params.token}</div>;
};

AccountActivate.propTypes = {
  activate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default AccountActivate;
