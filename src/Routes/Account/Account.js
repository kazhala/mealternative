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
  Typography,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { Details, Settings, Book, MenuBook, VpnKey } from '@material-ui/icons';
import DetailsTab from './_components/DetailsTab';
import BookmarksTab from './_components/BookmarksTab';
import RecipeDetailContainer from '../../Common/RecipeDetail/RecipeDetailContainer';
import RecipesTab from './_components/RecipesTab';
import PasswordTab from './_components/PasswordTab';

// misc
import useStyles from './Style';
import useInfiniteLoad from '../../Hooks/useInfiniteLoad';

const Account = props => {
  const {
    hasNextPage,
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
    infoMessage,
    handleLoadMore,
    isLoadable,
    tabTopEleRef
  } = props;
  const classes = useStyles();
  const handleScroll = useInfiniteLoad();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
            {!otherUserId ? (
              <Tab icon={<Settings />} />
            ) : (
              <Tab icon={<Details />} />
            )}
            <Tab icon={<MenuBook />} />
            {!otherUserId && <Tab icon={<Book />} />}
            {!otherUserId && <Tab icon={<VpnKey />} />}
          </Tabs>
        </AppBar>

        {/* tab panel to display information */}
        <Paper
          ref={tabTopEleRef}
          onScroll={e => handleScroll(e, isLoadable, handleLoadMore, isDesktop)}
          className={classes.tabPanel}
          elevation={1}
        >
          <DetailsTab
            otherUserId={otherUserId}
            updateProfileDetails={updateProfileDetails}
            profileUser={profileUser}
            classes={classes}
            tabIndex={0}
            activeTab={activeTab}
            detailLoading={detailLoading}
          />
          <RecipesTab
            isDesktop={isDesktop}
            handleLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            handleEditRecipe={handleEditRecipe}
            handleCardClick={handleCardClick}
            classes={classes}
            tabIndex={1}
            activeTab={activeTab}
            recipes={recipes}
            recipesLoading={recipesLoading}
            otherUserId={otherUserId}
            handleRemoveRecipe={handleRemoveRecipe}
          />
          <BookmarksTab
            isDesktop={isDesktop}
            handleLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            classes={classes}
            tabIndex={2}
            activeTab={activeTab}
            bookmarks={bookmarks}
            bookmarksLoading={bookmarksLoading}
            handleCardClick={handleCardClick}
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
  infoMessage: PropTypes.string,
  handleLoadMore: PropTypes.func.isRequired,
  isLoadable: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired
};

export default Account;
