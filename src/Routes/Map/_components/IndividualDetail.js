/*
  The more detailed model that display all information related to a restaurant
*/
import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from '../../../Common/BackDrop/BackDrop';
import { Zoom } from '@material-ui/core';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  return individualModal.show ? (
    <BackDrop background='rgba(0,0,0,0.5)' handleClose={clearDetailResDetail}>
      <Zoom in={true}>
        <div className={classes.indModalRoot}>
          {!individualModal.loading ? 'hello' : 'loading'}
        </div>
      </Zoom>
    </BackDrop>
  ) : null;
};

IndividualDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  individualModal: PropTypes.object.isRequired,
  clearDetailResDetail: PropTypes.func.isRequired
};

export default IndividualDetail;
