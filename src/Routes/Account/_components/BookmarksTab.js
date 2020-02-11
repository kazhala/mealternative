/*
  BookmarksTab
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import PageSpinner from '../../../Common/Spinner/PageSpinner';
import { Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const BookmarksTab = props => {
  const { bookmarks, classes, bookmarksLoading, activeTab, tabIndex } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner background='rgba(0,0,0,0)' loading={bookmarksLoading} />
        {bookmarks.map((bookmark, index) => (
          <div className={classes.bookmarkCard} key={index}>
            <img
              src={bookmark.recipe.thumbImageUrl}
              alt={bookmark.recipe.title}
              className={classes.bookmarkThumb}
            />
            <div className={classes.bookmarkRight}>
              <Typography variant='body1' className={classes.bookmarkTitle}>
                {bookmark.recipe.title}
              </Typography>
              <Typography
                variant='caption'
                className={classes.bookmarkDescription}
              >
                {bookmark.recipe.description}
              </Typography>
              <div className={classes.bookmarkOtherData}>
                <Rating
                  value={bookmark.recipe.rating}
                  precision={0.1}
                  size='small'
                  readOnly
                />
              </div>
            </div>
          </div>
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
  bookmarksLoading: PropTypes.bool.isRequired
};

export default BookmarksTab;
