import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';

const AccountActivate = props => {
  const { activate, loading, success, error, match } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      activate(match.params.token);
      setMounted(true);
    }
  }, [match, activate, mounted]);

  return (
    <>
      <PageSpinner loading={loading} text={'Activating your account..'} />
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
