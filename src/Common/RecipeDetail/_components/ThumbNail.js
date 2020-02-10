/*
  Thumbnail component fo detail recipe
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

const ThumbNail = props => {
  const { classes, imgUrl } = props;

  return (
    <div
      className={classes.detailThumbRoot}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%'
      }}
    />
  );
};

ThumbNail.propTypes = {
  classes: PropTypes.object.isRequired,
  imgUrl: PropTypes.string.isRequired
};

export default ThumbNail;
