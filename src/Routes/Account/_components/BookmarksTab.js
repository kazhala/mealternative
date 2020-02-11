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

const BookmarksTab = props => {
  const {
    handleCardClick,
    bookmarks,
    classes,
    bookmarksLoading,
    activeTab,
    tabIndex
  } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner background='rgba(0,0,0,0)' loading={bookmarksLoading} />
        {bookmarks.map((bookmark, index) => (
          <Paper
            onClick={e => handleCardClick(1, `/account/${bookmark.recipe._id}`)}
            elevation={2}
            className={classes.bookmarkCard}
            key={index}
          >
            {/* thumbnail of the recipe */}
            <img
              src={bookmark.recipe.thumbImageUrl}
              alt={bookmark.recipe.title}
              className={classes.bookmarkThumb}
            />
            <div className={classes.bookmarkRight}>
              {/* title and description, limited to 2 lines each */}
              <Typography variant='body1' className={classes.bookmarkTitle}>
                {bookmark.recipe.title}
              </Typography>
              <Typography
                variant='caption'
                className={classes.bookmarkDescription}
              >
                {bookmark.recipe.description}
              </Typography>

              {/* stars and bookmarks and likes count */}
              <div className={classes.bookmarkMisc}>
                <Rating
                  value={bookmark.recipe.rating}
                  precision={0.1}
                  size='small'
                  readOnly
                />
                ({bookmark.recipe.rating})
              </div>
              <div className={classes.bookmarkOtherData}>
                <div className={classes.bookmarkMisc}>
                  <ThumbUpOutlined fontSize='small' />
                  {bookmark.recipe.likes}
                  <BookmarkBorder fontSize='small' />
                  {bookmark.recipe.bookmarks}
                </div>
                <div className={classes.bookmarkMisc}>
                  <Avatar
                    className={classes.bookmarkAvatar}
                    src={bookmark.recipe.postedBy.photoUrl}
                  />
                </div>
              </div>
            </div>
          </Paper>
        ))}
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
  handleCardClick: PropTypes.func.isRequired
};

export default BookmarksTab;
