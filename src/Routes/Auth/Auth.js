/*
  Main Auth component, act as nested routes provider
*/

// react
import React from 'react';

// components
import { Switch, Route, Redirect } from 'react-router-dom';
import AccountActivate from './_components/AccountActivate';
import ForgotPassword from './_components/ForgotPassword';
import PasswordReset from './_components/PasswordReset';

// misc
import useStyles from './Style';

const Auth = props => {
  const {
    cleanUp,
    match,
    error,
    success,
    loading,
    activate,
    forgotPassword,
    resetPassword,
    formError
  } = props;

  const classes = useStyles();

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
            cleanUp={cleanUp}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`${match.url}/forgot-password`}
        render={props => (
          <ForgotPassword
            error={error}
            success={success}
            loading={loading}
            cleanUp={cleanUp}
            classes={classes}
            forgotPassword={forgotPassword}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`${match.url}/password-reset/:token`}
        render={props => (
          <PasswordReset
            error={error}
            success={success}
            loading={loading}
            cleanUp={cleanUp}
            classes={classes}
            resetPassword={resetPassword}
            formError={formError}
            {...props}
          />
        )}
      />
      <Redirect to='/' />
    </Switch>
  );
};

export default Auth;
