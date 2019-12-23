import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Divider } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

const DetailModal = props => {
  const { classes, resultRestaurantList, detailOpen, setDetailOpen } = props;

  const backDropStyle = {
    opacity: '0',
    zIndex: '-1'
  };

  return (
    <>
      <div
        style={detailOpen ? {} : backDropStyle}
        className={classes.detailModalBackDrop}
        onClick={() => setDetailOpen(false)}
      />
      <div
        style={{
          transform: detailOpen ? 'translateY(0)' : 'translateY(100vh)'
        }}
        className={classes.detailModalRoot}
      >
        <div
          onClick={() => setDetailOpen(false)}
          className={classes.detailModalCloseBtn}
        >
          <KeyboardArrowDown fontSize='large' />
        </div>
        <Divider />
        {resultRestaurantList.map((restaurant, index) => (
          <div key={index}>
            {restaurant.name}
            <div
              style={{ background: 'black', width: '5px', height: '50px' }}
            ></div>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
};

DetailModal.propTypes = {
  classes: PropTypes.object.isRequired,
  resultRestaurantList: PropTypes.array.isRequired,
  detailOpen: PropTypes.bool.isRequired,
  setDetailOpen: PropTypes.func.isRequired
};

export default DetailModal;
