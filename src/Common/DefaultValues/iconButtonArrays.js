/*
  Provide arrays for sidebar and menu bar
*/
import React from 'react';
import {
  HomeRounded,
  ExploreRounded,
  MenuBookRounded,
  VerifiedUserRounded,
  GroupAddRounded,
  AccountCircle,
  ExitToAppRounded,
  Create,
  GitHub,
} from '@material-ui/icons';

export const sideBarArrays = [
  { path: '/', text: 'Home', icon: <HomeRounded /> },
  { path: '/create', text: 'Create', icon: <Create /> },
  { path: '/map', text: 'Map', icon: <ExploreRounded /> },
  { path: '/recipes', text: 'Recipes', icon: <MenuBookRounded /> },
  {
    path: 'https://github.com/kazhala/mealternative',
    text: 'Code',
    icon: <GitHub />,
  },
];

export const authArrays = [
  { path: '/account', text: 'Account', icon: <AccountCircle /> },
  { path: null, text: 'Sign Out', icon: <ExitToAppRounded /> },
];

export const noAuthArrays = [
  { path: '/signin', text: 'Sign In', icon: <VerifiedUserRounded /> },
  { path: '/signup', text: 'Sign Up', icon: <GroupAddRounded /> },
];

export const authMenus = [
  { text: 'Account', path: '/account' },
  { text: 'SignOut' },
];

export const noAuthMenus = [
  { path: '/signin', text: 'Sign In' },
  { path: '/signup', text: 'Sign Up' },
];

export const toolTipIcons = [
  {
    path: '/create',
    title: 'Create something new for the community!',
    icon: <Create />,
  },
  {
    path: '/recipes',
    title: 'Feel like cooking? Checkout recipes',
    icon: <MenuBookRounded />,
  },
  {
    path: '/map',
    title: 'Explorer around on the map',
    icon: <ExploreRounded />,
  },
  {
    path: 'https://github.com/kazhala/mealternative',
    title: 'Checkout source code in github',
    icon: <GitHub />,
  },
];
