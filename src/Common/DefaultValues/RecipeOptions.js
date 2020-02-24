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
  FiberNew
} from '@material-ui/icons';

export const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Cleall All', typeNum: 4 },
  { icon: <FiberNew />, name: 'Newest', typeNum: 3 },
  { icon: <Bookmarks />, name: 'Bookmarked', typeNum: 2 },
  { icon: <Grade />, name: 'Ratings', typeNum: 1 },
  { icon: <ThumbUp />, name: 'Likes', typeNum: 0 }
];

export const selectedActions = [
  <Clear style={{ opacity: '0.3' }} />,
  <ClearAll style={{ opacity: '0.3' }} />,
  <FiberNew style={{ opacity: '0.3' }} />,
  <Bookmarks style={{ opacity: 0.3 }} />,
  <Grade style={{ opacity: '0.3' }} />,
  <ThumbUp style={{ opacity: '0.3' }} />
];

export const orderByArr = ['-likes', '-rating', '-bookmarks', '-createdAt'];
