/*
  The more detailed model that display all information related to a restaurant
*/
import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from '../../../Common/BackDrop/BackDrop';
import { Zoom, CircularProgress, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  console.log(individualModal);

  const { show, loading, details } = individualModal;
  const {
    name,
    rating,
    address,
    minutes,
    phone,
    opening_hours,
    photoUrl,
    photos,
    reviews,
    price_level,
    totalRatings,
    website,
    url
  } = details;

  return (
    <BackDrop
      show={show}
      background='rgba(0,0,0,0.5)'
      handleClose={clearDetailResDetail}
    >
      <Zoom in={show}>
        <div className={classes.indModalRoot}>
          {!loading ? (
            <div className={classes.indModalDetails}>
              <div className={classes.indTitle}>
                <Typography className={classes.indName} variant='h6'>
                  {name}
                </Typography>
                <Typography
                  variant='subtitle2'
                  component='div'
                  className={classes.indRating}
                >
                  ({rating})
                  <Rating
                    className={classes.markerRatingStar}
                    name='restaurant rating'
                    value={rating}
                    precision={0.1}
                    readOnly
                  />
                  ({price_level})
                </Typography>
              </div>
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
