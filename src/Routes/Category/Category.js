/*
  category component to display all the categories
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';

// misc
import useStyles from './Style';

const Category = props => {
  const { recipes, category } = props;
  const classes = useStyles();

  return (
    <div className={classes.categoryRoot}>
      {category && (
        <>
          <div
            className={classes.categoryThumb}
            style={{
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
              // backgroundAttachment: 'scroll'
            }}
          >
            <Typography className={classes.categoryTitle} variant='h3'>
              {category.name}
            </Typography>
          </div>
          <div>list of recipes</div>
        </>
      )}
    </div>
  );
};

Category.propTypes = {
  recipes: PropTypes.array.isRequired,
  category: PropTypes.object.isRequired
};

export default Category;
