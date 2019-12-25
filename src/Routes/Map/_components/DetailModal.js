/*
  The modal component to display detailed infomation on all restaurant
*/

// React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
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

// speedDial action items
// typeNum for soring usage
const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Default', typeNum: 0 },
  { icon: <TimeToLeave />, name: 'Distance', typeNum: 1 },
  { icon: <RateReview />, name: 'Rating', typeNum: 2 },
  { icon: <AttachMoney />, name: 'Price', typeNum: 3 }
];

// the modal style
// TODO: refactor to common component DarkModal
const backDropStyle = {
  opacity: '0',
  zIndex: '-1'
};

// Main component
const DetailModal = props => {
  const { classes, resultRestaurantList, detailOpen, setDetailOpen } = props;

  // ['no sort', 'distance', 'rating', 'price']
  // reversed to check if it needs reverse sorting
  const [sortOption, setSortOption] = useState({
    optionNum: 0,
    optionOpen: false,
    reversed: {
      distance: false,
      rating: false,
      price: false
    }
  });
  // sorted list, don't alter original list used in map for performance
  const [sortedResultList, setSortedResultList] = useState([]);
  // offset the height of sticky dial
  const [height, setHeight] = useState(0);

  const { optionNum, optionOpen, reversed } = sortOption;

  // calculate the speedDial component height
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  // get and format all details needed to display
  const getRestaurantDetails = restaurant => {
    let resDetail = {};
    // display no photo image if no photo
    resDetail.photoUrl = restaurant.photos
      ? restaurant.photos[0].getUrl()
      : 'https://nucomltd.com/wp-content/themes/gecko/assets/images/placeholder.png';
    resDetail.name = restaurant.name;
    resDetail.rating = restaurant.rating ? restaurant.rating : 0;
    resDetail.price_level = restaurant.price_level;
    resDetail.address = restaurant.formatted_address;
    resDetail.open = 'Yes';
    resDetail.distance = restaurant.distance;
    resDetail.totalRatings = restaurant.user_ratings_total;
    // google map link for more details or route direaction
    resDetail.googleMapLink = `https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&query_place_id=${
      restaurant.place_id
    }`;
    return resDetail;
  };

  // return the reversed object for updating sorting state
  const getReversedOption = (reversed, typeNum) => {
    switch (typeNum) {
      case 1:
        return {
          ...reversed,
          distance: !reversed.distance,
          rating: false,
          price: false
        };
      case 2:
        return {
          ...reversed,
          rating: !reversed.rating,
          distance: false,
          price: false
        };
      case 3:
        return {
          ...reversed,
          price: !reversed.price,
          distance: false,
          rating: false
        };
      default:
        return { ...reversed, distance: false, price: false, rating: false };
    }
  };

  // handle the action when user click the action item
  const handleClick = (e, typeNum) => {
    // if -1, means close the speedDial
    typeNum === -1
      ? setSortOption({ ...sortOption, optionOpen: false })
      : setSortOption(prevState => {
          // if the item is 'double' clicked, turn reversed option to true
          if (typeNum !== 0 && prevState.optionNum === typeNum) {
            const reversedOptions = getReversedOption(
              prevState.reversed,
              typeNum
            );
            return {
              ...prevState,
              optionNum: typeNum,
              optionOpen: false,
              reversed: { ...prevState.reversed, ...reversedOptions }
            };
          } else {
            // turn all reversed options to false
            const reversedOptions = getReversedOption(prevState.reversed, 0);
            return {
              ...prevState,
              optionNum: typeNum,
              optionOpen: false,
              reversed: { ...prevState.reversed, ...reversedOptions }
            };
          }
        });
  };

  // sort the result list when resultRestaurantList or sorting option changed
  useEffect(() => {
    if (resultRestaurantList.length > 0) {
      let newList = [...resultRestaurantList];
      switch (optionNum) {
        case 0:
          setSortedResultList(resultRestaurantList);
          break;
        case 1:
          setSortedResultList(
            newList.sort((a, b) => {
              return !reversed.distance
                ? a.distance - b.distance
                : b.distance - a.distance;
            })
          );
          break;
        case 2:
          setSortedResultList(
            newList.sort((a, b) => {
              return !reversed.rating
                ? b.rating - a.rating
                : a.rating - b.rating;
            })
          );
          break;
        case 3:
          setSortedResultList(
            newList.sort((a, b) => {
              return !reversed.price
                ? a.raw_price - b.raw_price
                : b.raw_price - a.raw_price;
            })
          );
          break;
        default:
          setSortedResultList(resultRestaurantList);
          break;
      }
    }
  }, [resultRestaurantList, optionNum, reversed]);

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

        {/* display the list of restaurant */}
        {sortedResultList.map((restaurant, index) => {
          const {
            name,
            photoUrl,
            rating,
            price_level,
            address,
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

        {/* speedDial component */}
        {sortedResultList.length > 2 && (
          <React.Fragment>
            <div style={{ marginBottom: -height }} />
            <SpeedDial
              ariaLabel='Sort Dial Button'
              icon={<Sort />}
              className={classes.detailModalDial}
              open={optionOpen}
              onOpen={() => setSortOption({ ...sortOption, optionOpen: true })}
              onClose={() =>
                setSortOption({ ...sortOption, optionOpen: false })
              }
              ref={measuredRef}
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
          </React.Fragment>
        )}
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
