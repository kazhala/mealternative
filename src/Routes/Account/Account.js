/*
  Profile page
*/

// react
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import {
  Paper,
  AppBar,
  Tabs,
  Tab,
  Avatar,
  Typography
} from '@material-ui/core';
import { Settings, Book, MenuBook, VpnKey } from '@material-ui/icons';
import DetailsTab from './_components/DetailsTab';
import BookmarksTab from './_components/BookmarksTab';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';
import RecipesTab from './_components/RecipesTab';
import PasswordTab from './_components/PasswordTab';

// misc
import useStyles from './Style';

const Account = props => {
  const {
    activeTab,
    handleTabChange,
    profileUser,
    updateProfileDetails,
    detailLoading,
    bookmarks,
    bookmarksLoading,
    match,
    handleCardClick,
    recipes,
    recipesLoading,
    otherUserId,
    handleRemoveRecipe,
    handleEditRecipe,
    handleUpdatePassword,
    infoMessage
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.accountRoot}>
      {/* profile avatar */}
      <div className={classes.accountTop}>
        <Avatar
          className={classes.accountAvatar}
          src={profileUser && profileUser.photoUrl}
        />
        <Typography variant='h6'>
          {profileUser && profileUser.username}
        </Typography>
      </div>

      {/* tabs to different contents */}
      <div className={classes.accountBottom}>
        {/* app bar for tabs */}
        <AppBar position='relative' color='default'>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            variant='fullWidth'
            textColor='primary'
          >
            <Tab icon={<Settings />} />
            <Tab icon={<Book />} />
            <Tab icon={<MenuBook />} />
            <Tab icon={<VpnKey />} />
          </Tabs>
        </AppBar>

        {/* tab panel to display information */}
        <Paper className={classes.tabPanel} elevation={1}>
          <DetailsTab
            updateProfileDetails={updateProfileDetails}
            profileUser={profileUser}
            classes={classes}
            tabIndex={0}
            activeTab={activeTab}
            detailLoading={detailLoading}
          />
          <BookmarksTab
            classes={classes}
            tabIndex={1}
            activeTab={activeTab}
            bookmarks={bookmarks}
            bookmarksLoading={bookmarksLoading}
            handleCardClick={handleCardClick}
          />
          <RecipesTab
            handleEditRecipe={handleEditRecipe}
            handleCardClick={handleCardClick}
            classes={classes}
            tabIndex={2}
            activeTab={activeTab}
            recipes={recipes}
            recipesLoading={recipesLoading}
            otherUserId={otherUserId}
            handleRemoveRecipe={handleRemoveRecipe}
          />
          <PasswordTab
            handleUpdatePassword={handleUpdatePassword}
            activeTab={activeTab}
            tabIndex={3}
            classes={classes}
            infoMessage={infoMessage}
          />
        </Paper>
      </div>

      <Route
        path={`${match.path}/:recipeid`}
        render={props => <RecipeDetailContainer {...props} />}
      />
    </div>
  );
};

Account.propTypes = {
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  otherUserId: PropTypes.any,
  handleRemoveRecipe: PropTypes.func.isRequired,
  handleEditRecipe: PropTypes.func.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
  infoMessage: PropTypes.string
};

export default Account;
