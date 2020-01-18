/*
  Recipe route default values
*/

import React from 'react';
import {
  ThumbUp,
  Grade,
  Bookmarks,
  Update,
  Clear,
  ClearAll,
  FiberNew,
  SortByAlpha
} from '@material-ui/icons';

export const actions = [
  { icon: <Clear />, name: 'Close', typeNum: -1 },
  { icon: <ClearAll />, name: 'Cleall All', typeNum: 6 },
  { icon: <SortByAlpha />, name: 'Alphabet', typeNum: 5 },
  { icon: <FiberNew />, name: 'Newest', typeNum: 4 },
  { icon: <Update />, name: 'Updated', typeNum: 3 },
  { icon: <Bookmarks />, name: 'Bookmarked', typeNum: 2 },
  { icon: <Grade />, name: 'Ratings', typeNum: 1 },
  { icon: <ThumbUp />, name: 'Likes', typeNum: 0 }
];
