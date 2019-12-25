/*
  The modal component to display detailed infomation on all restaurant
*/

// React
import React, { useState } from 'react';
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
  const {
    classes,
    getRestaurantDetails,
    optionOpen,
    setSortOption,
    sortOption,
    detailOpen,
    setDetailOpen,
    handleClick,
    sortedResultList
  } = props;

  const [height, setHeight] = useState(0);

  // calculate the speedDial component height
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

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

        {/* speedDial component */}
        <div style={{ marginBottom: -height }} />
        <SpeedDial
          ariaLabel='Sort Dial Button'
          icon={<Sort />}
          className={classes.detailModalDial}
          open={optionOpen}
          onOpen={() => setSortOption({ ...sortOption, optionOpen: true })}
          onClose={() => setSortOption({ ...sortOption, optionOpen: false })}
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
      </div>
    </>
  );
};

DetailModal.propTypes = {
  classes: PropTypes.object.isRequired,
  detailOpen: PropTypes.bool.isRequired,
  setDetailOpen: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  sortedResultList: PropTypes.array.isRequired,
  getRestaurantDetails: PropTypes.func.isRequired,
  optionOpen: PropTypes.bool.isRequired,
  setSortOption: PropTypes.func.isRequired,
  sortOption: PropTypes.object.isRequired
};

export default DetailModal;
