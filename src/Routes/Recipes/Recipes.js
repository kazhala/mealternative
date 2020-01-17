import React, { useState } from 'react';
import useStyles from './Style';
import { Button } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import SearchInput from '../../Common/Inputs/SearchInput';

const Recipes = props => {
  const classes = useStyles();
  const [sortOption, setSortOption] = useState({
    show: false,
    optionNum: 0,
    reversed: {}
  });

  return (
    <div className={classes.recipeRoot}>
      <div className={classes.recipeSearchRoot}>
        <SearchInput
          placeholder='Search Recipe..'
          classes={classes.recipeSearchField}
        />
        <Button variant='contained' color='primary'>
          Search
        </Button>
      </div>
      <SpeedDial
        ariaLabel='Recipe sort speedDial'
        className={classes.recipeDial}
        icon={<SpeedDialIcon />}
        open={sortOption.show}
        onOpen={() => setSortOption({ ...sortOption, show: true })}
        onClose={() => setSortOption({ ...sortOption, show: false })}
      ></SpeedDial>
    </div>
  );
};

export default Recipes;
