/*
  Recipe route default values
*/

import React from 'react';
import {
  ThumbUp,
  Grade,
  Bookmarks,
  Clear,
  ClearAll,
  DateRange,
  SortByAlpha
} from '@material-ui/icons';

export const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Cleall All', typeNum: 5 },
  { icon: <SortByAlpha />, name: 'Alphabet', typeNum: 4 },
  { icon: <DateRange />, name: 'Date', typeNum: 3 },
  { icon: <Bookmarks />, name: 'Bookmarked', typeNum: 2 },
  { icon: <Grade />, name: 'Ratings', typeNum: 1 },
  { icon: <ThumbUp />, name: 'Likes', typeNum: 0 }
];

export const orderByArr = [
  '-likes',
  '-rating',
  '-bookmarks',
  '-createdAt',
  'title'
];
