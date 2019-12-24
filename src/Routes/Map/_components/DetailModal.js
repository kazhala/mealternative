/*
  The modal component to display detailed infomation on all restaurant
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {
  KeyboardArrowDown,
  Sort,
  TimeToLeave,
  RateReview,
  AttachMoney,
  Clear,
  ClearAll
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Default', typeNum: 0 },
  { icon: <TimeToLeave />, name: 'Distance', typeNum: 1 },
  { icon: <RateReview />, name: 'Rating', typeNum: 2 },
  { icon: <AttachMoney />, name: 'Price', typeNum: 3 }
];

const DetailModal = props => {
  const { classes, resultRestaurantList, detailOpen, setDetailOpen } = props;

  // ['no sort', 'distance', 'rating', 'price']
  const [sortOption, setSortOption] = useState(0);
  const [optionOpen, setOptionOpen] = useState(false);

  const backDropStyle = {
    opacity: '0',
    zIndex: '-1'
  };

  // get and format all details needed to display
  const getRestaurantDetails = restaurant => {
    let resDetail = {};
    resDetail.photoUrl = restaurant.photos
      ? restaurant.photos[0].getUrl()
      : 'https://nucomltd.com/wp-content/themes/gecko/assets/images/placeholder.png';
    resDetail.name = restaurant.name;
    resDetail.rating = restaurant.rating ? restaurant.rating : 'N/A';
    resDetail.price_level = restaurant.price_level;
    resDetail.address = restaurant.formatted_address;
    resDetail.open = restaurant.opening_hours.isOpen() ? 'Yes' : 'No';
    resDetail.distance = restaurant.distance;
    resDetail.totalRatings = restaurant.user_ratings_total;
    resDetail.googleMapLink = `https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&query_place_id=${
      restaurant.place_id
    }`;
    return resDetail;
  };

  const handleClick = (e, typeNum) => {
    console.log(typeNum);
    setOptionOpen(false);
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
        {resultRestaurantList.map((restaurant, index) => {
          const {
            name,
            photoUrl,
            rating,
            price_level,
            address,
            open,
            totalRatings,
            googleMapLink,
            distance
          } = getRestaurantDetails(restaurant);
          return (
            <div className={classes.detailModalCard} key={index}>
              <div
                className={classes.cardImage}
                style={{
                  backgroundImage: `url(${photoUrl})`
                }}
              />
              <div className={classes.cardDescriptions}>
                <Typography variant='body2'>Name: {name}</Typography>
                <Typography variant='body2'>Rating: {rating}</Typography>
                <Typography variant='body2'>
                  price-level: {price_level}
                </Typography>
                <Typography variant='body2'>Open: {open}</Typography>
                <Typography variant='body2'>
                  Total ratings: {totalRatings}
                </Typography>
                <Typography variant='body2'>
                  Distance: {(distance / 1000).toFixed(2)}Km
                </Typography>
                <Typography variant='body2'>Address: {address}</Typography>
                <Typography variant='body2'>
                  More Info:{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={googleMapLink}
                  >
                    Google Map
                  </a>
                </Typography>
              </div>
            </div>
          );
        })}
        <SpeedDial
          ariaLabel='Sort Dial Button'
          icon={<Sort />}
          className={classes.detailModalDial}
          open={optionOpen}
          onOpen={() => setOptionOpen(true)}
          onClose={() => setOptionOpen(false)}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={e => handleClick(e, action.typeNum)}
            />
          ))}
        </SpeedDial>
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
