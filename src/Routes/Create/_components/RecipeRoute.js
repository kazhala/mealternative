import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, InputAdornment } from '@material-ui/core';
import { Title, Description } from '@material-ui/icons';
import ImageOption from './ImageOption';

const RecipeRoute = props => {
  const { classes } = props;

  return (
    <div className={classes.routeRoot}>
      <Typography className={classes.routeTitle} component='div' variant='h6'>
        Create new recipe
      </Typography>
      <TextField
        placeholder='Title of your recipe'
        variant='outlined'
        label='Title'
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Title />
            </InputAdornment>
          )
        }}
      />
      <TextField
        placeholder='Description of your recipe'
        variant='outlined'
        label='Description'
        multiline
        rows={3}
        className={classes.titleInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Description />
            </InputAdornment>
          )
        }}
      />
      <ImageOption classes={classes} />
    </div>
  );
};

RecipeRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecipeRoute;
