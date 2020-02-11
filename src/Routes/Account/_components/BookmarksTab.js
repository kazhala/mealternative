import React from 'react';
import PropTypes from 'prop-types';
import PageSpinner from '../../../Common/Spinner/PageSpinner';

const BookmarksTab = props => {
  const { bookmarks, classes, bookmarksLoading, activeTab, tabIndex } = props;

  return (
    activeTab === tabIndex && (
      <div className={classes.tabRoot}>
        <PageSpinner background='rgba(0,0,0,0)' loading={bookmarksLoading} />
        {bookmarks.map((bookmark, index) => (
          <div key={index}>hello</div>
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
