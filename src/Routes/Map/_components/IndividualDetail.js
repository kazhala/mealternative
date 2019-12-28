/*
  The more detailed model that display all information related to a restaurant
*/
import React, { useState } from 'react';
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
  ListItemText,
  Collapse
} from '@material-ui/core';
import {
  ThumbsUpDown,
  DirectionsWalk,
  GpsFixed,
  LocationOn,
  Phone,
  Schedule,
  ExpandLess,
  ExpandMore,
  Web
} from '@material-ui/icons';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  const [collapse, setCollapse] = useState({
    review: true,
    openHours: true
  });

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

  const handleOpen = type => {
    if (type === 0) {
      setCollapse(prevState => ({
        ...prevState,
        review: false,
        openHours: !prevState.openHours
      }));
    }
  };

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

              <List
                dense
                component='nav'
                aria-labelledby='restaurant-detail-list'
              >
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

                <ListItem divider button onClick={() => handleOpen(0)}>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      opening_hours && opening_hours.isOpen()
                        ? 'Open'
                        : 'Closed'
                    }
                  />
                  {!collapse.openHours ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={!collapse.openHours} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding dense>
                    {opening_hours &&
                      opening_hours.weekday_text.map((info, index) => (
                        <ListItem key={index} divider>
                          <ListItemText secondary={info} />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>

                <ListItem
                  divider
                  component='a'
                  button
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ListItemIcon>
                    <Web />
                  </ListItemIcon>
                  <ListItemText primary={website} />
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
