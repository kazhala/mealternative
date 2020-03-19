/*
  The modal component to display detailed infomation on all restaurant
*/

// React
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import ComboRating from '../../../Common/ComboRating/ComboRating';
import CardSkeleton from './CardSkeleton';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import {
  KeyboardArrowDown,
  Sort,
  RateReview,
  Restaurant,
  LocalOffer,
  Directions,
  LocationOn,
  More
} from '@material-ui/icons';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

// misc
import {
  mapDetailModalSkeletons,
  actions,
  backDropStyle
} from '../../../Common/DefaultValues/MapDetailArrays';

// Main component
const DetailModal = props => {
  const {
    classes,
    resultRestaurantList,
    detailOpen,
    setDetailOpen,
    getBasicResDetails,
    getDetailedResDetail,
    setSelectedMarker
  } = props;

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

  const topElementRef = useRef(null);

  // desctruct values
  const { optionNum, optionOpen, reversed } = sortOption;

  // calculate the speedDial component height
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

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
      topElementRef && topElementRef.current.scrollTo(0, 0);
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
    } else {
      setSortedResultList([]);
    }
  }, [resultRestaurantList, optionNum, reversed]);

  // set the active marker and close the detailModal if on mobile device
  const markSelectMarker = restaurant => {
    setSelectedMarker(restaurant);
    setDetailOpen(false);
  };

  // using material ui to get view port width
  // inline animation require responsive
  const theme = useTheme();
  const shiftDown = useMediaQuery(theme.breakpoints.down('sm'));
  const hide = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <div
        style={detailOpen ? {} : backDropStyle}
        className={classes.detailModalBackDrop}
        onClick={() => setDetailOpen(false)}
      />
      <div
        style={{
          // hide the animation on big device
          transform: shiftDown
            ? detailOpen
              ? 'translateY(0)'
              : 'translateY(100vh)'
            : null
        }}
        ref={topElementRef}
        className={classes.detailModalRoot}
      >
        <div
          onClick={() => setDetailOpen(false)}
          className={classes.detailModalCloseBtn}
        >
          <KeyboardArrowDown fontSize='large' />
        </div>

        {/* display the list of restaurant */}
        {sortedResultList.length > 0
          ? sortedResultList.map((restaurant, index) => {
              const {
                name,
                photoUrl,
                rating,
                price_level,
                address,
                totalRatings,
                distance
              } = getBasicResDetails(restaurant);

              return (
                <div className={classes.detailModalCard} key={index}>
                  <div
                    className={classes.cardImage}
                    style={{
                      backgroundImage: `url(${photoUrl})`
                    }}
                  />
                  <List
                    component='nav'
                    dense
                    className={classes.cardDescriptions}
                  >
                    <ListItem
                      button
                      onClick={() => markSelectMarker(restaurant)}
                    >
                      <ListItemIcon>
                        <Restaurant fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.nameClamp}
                        style={{ lineClamp: 3 }}
                        primary={
                          <Typography variant='caption'>{name}</Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocalOffer fontSize='small' />
                      </ListItemIcon>
                      <ComboRating rating={rating} price={price_level} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <RateReview fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant='caption'>
                            {totalRatings} reviews
                          </Typography>
                        }
                      />
                    </ListItem>
                    {!hide && (
                      <>
                        <ListItem>
                          <ListItemIcon>
                            <Directions fontSize='small' />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant='caption'>
                                {(distance / 1000).toFixed(2)} km away
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem
                          button
                          onClick={() => markSelectMarker(restaurant)}
                        >
                          <ListItemIcon>
                            <LocationOn fontSize='small' />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant='caption'>
                                {address}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </>
                    )}
                    <ListItem
                      onClick={() => getDetailedResDetail(restaurant)}
                      button
                    >
                      <ListItemIcon>
                        <More fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant='caption'>
                            Detailed Info
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </div>
              );
            })
          : mapDetailModalSkeletons.map(skeleton => (
              <CardSkeleton key={skeleton} classes={classes} />
            ))}

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
  setDetailOpen: PropTypes.func.isRequired,
  getBasicResDetails: PropTypes.func.isRequired,
  getDetailedResDetail: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired
};

export default DetailModal;
