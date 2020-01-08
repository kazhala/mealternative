import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';

const AccountActivate = props => {
  const { activate, loading, success, error, match, history } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      activate(match.params.token);
      setMounted(true);
    }
  }, [match, activate, mounted]);

  useEffect(() => {
    if (success) {
      history.replace('/');
    }
  }, [success, history]);

  const loadingMessage = success =>
    success
      ? 'Account activated! Attempting to sign in..'
      : 'Activating your account..';

  return (
    <>
      <PageSpinner loading={loading} text={loadingMessage(success)} />
    </>
  );
};

AccountActivate.propTypes = {
  activate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default AccountActivate;
