/*
  The more detailed model that display all information related to a restaurant
*/
import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from '../../../Common/BackDrop/BackDrop';
import { Zoom, CircularProgress } from '@material-ui/core';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  console.log(individualModal);

  return (
    <BackDrop
      show={individualModal.show}
      background='rgba(0,0,0,0.5)'
      handleClose={clearDetailResDetail}
    >
      <Zoom in={individualModal.show}>
        <div className={classes.indModalRoot}>
          {!individualModal.loading ? (
            <div className={classes.modalDetails}>
              <div>Name</div>
              <div>Rating</div>
            </div>
          ) : (
            <CircularProgress disableShrink size='4rem' />
          )}
        </div>
      </Zoom>
    </BackDrop>
  );
};

IndividualDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  individualModal: PropTypes.object.isRequired,
  clearDetailResDetail: PropTypes.func.isRequired
};

export default IndividualDetail;
