import React from 'react';
import PropTypes from 'prop-types';

const ThumbNail = props => {
  const { classes } = props;

  return (
    <div
      className={classes.detailThumbRoot}
      style={{
        backgroundImage:
          'url(https://res.cloudinary.com/kazhala/image/upload/v1580344284/mealternative/thumbnail/hu9hoevzvceyq5vko15e.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%'
      }}
    />
  );
};

ThumbNail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ThumbNail;
