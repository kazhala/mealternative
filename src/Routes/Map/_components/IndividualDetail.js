/*
  The more detailed model that display all information related to a restaurant
*/
import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from '../../../Common/BackDrop/BackDrop';
import ComboRating from '../../../Common/ComboRating/ComboRating';
import {
  Zoom,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  ThumbsUpDown,
  DirectionsWalk,
  GpsFixed,
  LocationOn,
  Phone
} from '@material-ui/icons';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  console.log(individualModal);

  const { show, loading, details } = individualModal;
  const {
    name,
    rating,
    distance,
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
        <div
          className={classes.indModalRoot}
          onClick={e => e.stopPropagation()}
        >
          {!loading ? (
            <div className={classes.indModalDetails}>
              <div
                className={classes.indThumb}
                style={{
                  backgroundImage: `url(${photoUrl})`
                }}
              />
              <div className={classes.indTitle}>
                <Typography className={classes.indName} variant='h6'>
                  {name}
                </Typography>
                <Typography variant='subtitle2' component='div'>
                  <ComboRating rating={rating} price={price_level} />
                </Typography>
              </div>
              <List component='nav' aria-labelledby='restaurant-detail-list'>
                <ListItem divider>
                  <ListItemIcon>
                    <ThumbsUpDown />
                  </ListItemIcon>
                  <ListItemText primary={`${totalRatings} ratings`} />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon>
                    <DirectionsWalk />
                  </ListItemIcon>
                  <ListItemText primary={`${minutes && minutes.text}`} />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon>
                    <GpsFixed />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${(distance / 1000).toFixed(2)}km away`}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary={`${phone}`} />
                </ListItem>
                <ListItem
                  divider
                  component='a'
                  button
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary={address} />
                </ListItem>
              </List>
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
