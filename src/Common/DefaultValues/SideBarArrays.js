import React from 'react';
import {
  HomeRounded,
  ExploreRounded,
  MenuBookRounded,
  RestaurantMenuRounded,
  VerifiedUserRounded,
  GroupAddRounded,
  AccountCircle,
  ExitToAppRounded
} from '@material-ui/icons';

export const sideBarArrays = [
  { path: '/', text: 'Home', icon: <HomeRounded /> },
  { path: '/map', text: 'Map', icon: <ExploreRounded /> },
  { path: '/recipes', text: 'Recipes', icon: <MenuBookRounded /> },
  { path: '/Meals', text: 'Meals', icon: <RestaurantMenuRounded /> }
];

export const authArrays = [
  { path: '/account', text: 'Account', icon: <AccountCircle /> },
  { path: null, text: 'Sign Out', icon: <ExitToAppRounded /> }
];

export const noAuthArrays = [
  { path: '/signin', text: 'Sign In', icon: <VerifiedUserRounded /> },
  { path: '/signup', text: 'Sign Up', icon: <GroupAddRounded /> }
];
