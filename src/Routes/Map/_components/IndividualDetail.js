/*
  The more detailed model that display all information related to a restaurant
*/

// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
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
  Collapse,
  ListItemAvatar,
  Avatar,
  Fab,
  GridList,
  GridListTile
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
  Http,
  RateReview,
  Close
} from '@material-ui/icons';

const IndividualDetail = props => {
  const { classes, individualModal, clearDetailResDetail } = props;

  // controls the open/close of the expandable list
  const [collapse, setCollapse] = useState({
    review: true,
    openHours: true
  });

  const { show, loading, details } = individualModal;
  const {
    name,
    rating,
    distance,
    address,
    minutes,
    phone,
    opening_hours,
    photos,
    photoUrl,
    reviews,
    price_level,
    totalRatings,
    website,
    url
  } = details;

  // handle the open/close of expandable list
  // ['openHours', 'revie']
  const handleOpen = type => {
    if (type === 0) {
      setCollapse(prevState => ({
        ...prevState,
        review: true,
        openHours: !prevState.openHours
      }));
    }
    if (type === 1) {
      setCollapse(prevState => ({
        ...prevState,
        review: !prevState.review,
        openHours: true
      }));
    }
  };

  // close all expandable list on modal close
  useEffect(() => {
    if (!show) {
      setCollapse({
        review: true,
        openHours: true
      });
    }
  }, [show]);

  console.log(photos);

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
          <Fab
            onClick={clearDetailResDetail}
            color='primary'
            size='small'
            className={classes.indModalCloseBtn}
          >
            <Close />
          </Fab>
          {!loading ? (
            <div className={classes.indModalDetails}>
              {/* image gallery */}
              <div className={classes.indModalGalleryRoot}>
                <GridList className={classes.indThumb} cols={1}>
                  <GridListTile style={{ height: '100%' }}>
                    <img src={photoUrl} alt='restaurant' />
                  </GridListTile>
                  {photos &&
                    photos.map((photo, index) => (
                      <GridListTile key={index} style={{ height: '100%' }}>
                        <img src={photo.getUrl()} alt='restaurant' />
                      </GridListTile>
                    ))}
                </GridList>
              </div>
              {/* <div */}
              {/*   className={classes.indThumb} */}
              {/*   style={{ */}
              {/*     backgroundImage: `url(${photoUrl})` */}
              {/*   }} */}
              {/* /> */}
              {/* title */}
              <div className={classes.indTitle}>
                <Typography className={classes.indName} variant='h6'>
                  {name}
                </Typography>
                <Typography variant='subtitle2' component='div'>
                  <ComboRating rating={rating} price={price_level} />
                </Typography>
              </div>

              {/* list of information */}
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

                {/* opening_hourse expandable list */}
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

                {/* list that is also a tag */}
                <ListItem
                  divider
                  component='a'
                  button
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ListItemIcon>
                    <Http />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div style={{ overflow: 'hidden' }}>{website}</div>
                    }
                  />
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

                {/* displays top5 reviews */}
                <ListItem divider button onClick={() => handleOpen(1)}>
                  <ListItemIcon>
                    <RateReview />
                  </ListItemIcon>
                  <ListItemText primary='Reviews' />
                  {!collapse.review ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={!collapse.review} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding dense>
                    {reviews &&
                      reviews.map((review, index) => (
                        <ListItem
                          button
                          component='a'
                          href={review.author_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          divider
                          key={index}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={`${review.author_name} avatar`}
                              src={review.profile_photo_url}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div>
                                {review.author_name}
                                <Typography
                                  style={{ opacity: 0.7 }}
                                  component='div'
                                  variant='caption'
                                >
                                  - {review.relative_time_description} (
                                  {review.rating}/5)
                                </Typography>
                              </div>
                            }
                            secondary={
                              <Typography component='div' variant='caption'>
                                {review.text}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
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
