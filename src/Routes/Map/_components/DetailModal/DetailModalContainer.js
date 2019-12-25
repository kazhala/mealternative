/*
  The container for detailedModal display restaurant results
*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DetailModal from './DetailModal';

const DetailModalContainer = props => {
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

  const { optionNum, optionOpen, reversed } = sortOption;
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
    resDetail.open = restaurant.opening_hours.isOpen() ? 'Yes' : 'No';
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
    <DetailModal
      classes={classes}
      detailOpen={detailOpen}
      setDetailOpen={setDetailOpen}
      handleClick={handleClick}
      sortedResultList={sortedResultList}
      getRestaurantDetails={getRestaurantDetails}
      sortOption={sortOption}
      setSortOption={setSortOption}
      optionOpen={optionOpen}
    />
  );
};

DetailModalContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  resultRestaurantList: PropTypes.array.isRequired,
  detailOpen: PropTypes.bool.isRequired,
  setDetailOpen: PropTypes.func.isRequired
};

export default DetailModalContainer;
