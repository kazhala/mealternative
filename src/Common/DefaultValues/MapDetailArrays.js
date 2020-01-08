/*
  Contains some of the required arrays for DetailModal component in map route
*/
import React from 'react';
import {
  ClearAll,
  Clear,
  TimeToLeave,
  RateReview,
  AttachMoney
} from '@material-ui/icons';

// determine how many skeleton to show
export const mapDetailModalSkeletons = [1, 2, 3];

// speedDial action items
// typeNum for soring usage
export const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Default', typeNum: 0 },
  { icon: <TimeToLeave />, name: 'Distance', typeNum: 1 },
  { icon: <RateReview />, name: 'Rating', typeNum: 2 },
  { icon: <AttachMoney />, name: 'Price', typeNum: 3 }
];

// the modal style
export const backDropStyle = {
  opacity: '0',
  zIndex: '-1'
};

