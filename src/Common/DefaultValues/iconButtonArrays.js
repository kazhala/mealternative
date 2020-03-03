/*
  Provide arrays for sidebar and menu bar
*/
import React from 'react';
import {
  HomeRounded,
  ExploreRounded,
  MenuBookRounded,
  RestaurantMenuRounded,
  VerifiedUserRounded,
  GroupAddRounded,
  AccountCircle,
  ExitToAppRounded,
  Create
} from '@material-ui/icons';

export const sideBarArrays = [
  { path: '/', text: 'Home', icon: <HomeRounded /> },
  { path: '/create', text: 'Create', icon: <Create /> },
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

export const authMenus = [
  { text: 'Account', path: '/account' },
  { text: 'SignOut' }
];

export const noAuthMenus = [
  { path: '/signin', text: 'Sign In' },
  { path: '/signup', text: 'Sign Up' }
];

export const toolTipIcons = [
  {
    path: '/create',
    title: 'Create something new for the community!',
    icon: <Create />
  },
  {
    path: '/meals',
    title: 'Coming soon',
    icon: <RestaurantMenuRounded />,
    disable: true
  },
  {
    path: '/recipes',
    title: 'Feel like cooking? Checkout recipes',
    icon: <MenuBookRounded />
  },
  {
    path: '/map',
    title: 'Explorer around on the map',
    icon: <ExploreRounded />
  }
];
