import React from 'react';
import PropTypes from 'prop-types';

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
        <div className={classes.detailModalList}>hello world</div>
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
