/*
  BookmarksTab
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { Typography, Avatar, Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ThumbUpOutlined, BookmarkBorder } from '@material-ui/icons';
import LoadMoreSpinner from '../../../Common/Spinner/LoadMoreSpinner';

const BookmarksTab = props => {
  const {
    handleCardClick,
    bookmarks,
    classes,
    bookmarksLoading,
    activeTab,
    tabIndex,
    hasNextPage,
    isDesktop,
    handleLoadMore
  } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner background='rgba(0,0,0,0)' loading={bookmarksLoading} />
        {bookmarks.map((bookmark, index) => (
          <Paper
            onClick={e => handleCardClick(`/account/${bookmark.recipe._id}`)}
            elevation={2}
            className={classes.tabCard}
            key={index}
          >
            {/* thumbnail of the recipe */}
            <div
              style={{
                backgroundImage: `url(${bookmark.recipe.thumbImageUrl})`
              }}
              className={classes.cardThumb}
            />
            <div className={classes.cardRight}>
              {/* title and description, limited to 2 lines each */}
              <Typography variant='body1' className={classes.cardText}>
                {bookmark.recipe.title}
              </Typography>
              <Typography variant='caption' className={classes.cardText}>
                {bookmark.recipe.description}
              </Typography>

              {/* stars and bookmarks and likes count */}
              <div className={classes.cardMisc}>
                <Rating
                  value={bookmark.recipe.rating}
                  precision={0.1}
                  size='small'
                  readOnly
                />
                ({bookmark.recipe.rating})
              </div>
              <div className={classes.bookmarkOtherData}>
                <div className={classes.cardMisc}>
                  <ThumbUpOutlined fontSize='small' />
                  {bookmark.recipe.likes}
                  <BookmarkBorder fontSize='small' />
                  {bookmark.recipe.bookmarks}
                </div>
                <div className={classes.cardMisc}>
                  <Avatar
                    className={classes.bookmarkAvatar}
                    src={bookmark.recipe.postedBy.photoUrl}
                  />
                </div>
              </div>
            </div>
          </Paper>
        ))}
        <LoadMoreSpinner
          isDesktop={isDesktop}
          loading={false}
          account
          handleLoadMore={handleLoadMore}
          hasNextPage={hasNextPage}
          textAlt="You've reached the bottom"
        />
      </div>
    )
  );
};

BookmarksTab.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired,
  bookmarksLoading: PropTypes.bool.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  handleLoadMore: PropTypes.func.isRequired
};

export default BookmarksTab;
