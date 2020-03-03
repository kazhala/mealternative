/*
  Home page of mealternative
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import TopCard from './_components/TopCard';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';

// misc
import useStyles from './Style';

const Home = props => {
  const { handleCategoryClick, handleClick, categories } = props;

  const classes = useStyles();
  const theme = useTheme();
  const midScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.homeRoot}>
      <div className={classes.homeTop}>
        {midScreen && (
          <Typography
            className={classes.homeBottomTitle}
            component='div'
            variant='h5'
          >
            Discover
          </Typography>
        )}
        <TopCard
          onClick={() => handleClick('/map')}
          classes={classes}
          title='Map'
          description='Checkout restaurants near you'
          imgUrl='https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?cs=srgb&dl=blur-cartography-close-up-concept-408503.jpg&fm=jpg'
        />
        <TopCard
          onClick={() => handleClick('/recipes')}
          classes={classes}
          title='Recipes'
          description='Feel like cooking?'
          imgUrl='https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        />
        {!midScreen && (
          <TopCard
            classes={classes}
            disable
            title='Meals'
            description='Coming soon..'
            imgUrl='https://images.pexels.com/photos/5876/food-salad-healthy-vegetables.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          />
        )}
      </div>
      <div className={classes.homeBottom}>
        <Typography
          className={classes.homeBottomTitle}
          components='div'
          variant='h5'
        >
          Categories
        </Typography>
        {categories.map((category, index) => (
          <div
            className={classes.categoryCard}
            style={{
              backgroundImage: `url(${category.imageUrl})`
            }}
            key={index}
            onClick={() => handleCategoryClick(category._id)}
          >
            <Typography variant='h6' className={classes.topCardTitle}>
              {category.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  categories: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired
};

export default Home;
