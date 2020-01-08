import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountActivate from './_components/AccountActivate';

const Auth = props => {
  const {
    cleanUp,
    match,
    error,
    success,
    loading,
    isAuthenticated,
    activate
  } = props;
  return (
    <Switch>
      <Route
        path={`${match.url}/activate/:token`}
        exact
        render={props => (
          <AccountActivate
            error={error}
            success={success}
            loading={loading}
            activate={activate}
            isAuthenticated={isAuthenticated}
            cleanUp={cleanUp}
            {...props}
          />
        )}
      />
    </Switch>
  );
};

export default Auth;
