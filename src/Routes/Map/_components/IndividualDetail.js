/*
  The more detailed model that display all information related to a restaurant
*/
import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from '../../../Common/BackDrop/BackDrop';

const IndividualDetail = props => {
  const { classes, individualModal, setInividualModal } = props;

  const { place_id, details } = individualModal;

  const handleModalClose = () => {
    setInividualModal({ ...individualModal, place_id: '', details: {} });
  };

  return (
    place_id && (
      <BackDrop handleClose={handleModalClose}>
        <div>{place_id}</div>
      </BackDrop>
    )
  );
};

IndividualDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  individualModal: PropTypes.object.isRequired,
  setInividualModal: PropTypes.func.isRequired
};

export default IndividualDetail;
