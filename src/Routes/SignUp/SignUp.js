import React from 'react';
import useStyles from './Style';

const SignUp = props => {
  // const {  } = props;
  const classes = useStyles();

  return (
    <div className={classes.signUpRoot}>
      <div className={classes.signUpCard}>SignUp</div>
    </div>
  );
};

// SignUp.propTypes = {
//   :  PropTypes.any
// }

export default SignUp;
