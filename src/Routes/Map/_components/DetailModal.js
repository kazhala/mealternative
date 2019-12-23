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

  console.log(resultRestaurantList);

  const getRestaurantDetails = restaurant => {
    let resDetail = {};
    resDetail.photoUrl = restaurant.photos[0].getUrl();
    resDetail.name = restaurant.name;
    resDetail.rating = restaurant.rating ? restaurant.rating : 'N/A';
    resDetail.price_level = restaurant.price_level;
    resDetail.address = restaurant.formatted_address;
    resDetail.open = restaurant.opening_hours.isOpen() ? 'Yes' : 'No';
    resDetail.totalRatings = restaurant.user_ratings_total;
    const extractRegex = /href="(.*?)"/g;
    resDetail.googleMapLink = extractRegex.exec(
      restaurant.photos[0].html_attributions[0]
    )[1];
    return resDetail;
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
        {resultRestaurantList.map((restaurant, index) => {
          const {
            name,
            photoUrl,
            rating,
            price_level,
            address,
            oepn,
            totalRatings,
            googleMapLink
          } = getRestaurantDetails(restaurant);
          return (
            <div key={index}>
              <div
                style={{
                  width: '1rem',
                  height: '1rem',
                  background: `url(${photoUrl})`
                }}
              />
              <Typography variant='subtitle1'>{name}</Typography>
              <Typography variant='subtitle1'>Rating: {rating}</Typography>
              <Typography variant='subtitle1'>
                price-level: {price_level}
              </Typography>
              {googleMapLink}
              <Divider />
            </div>
          );
        })}
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
