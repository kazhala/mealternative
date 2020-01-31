import React, { useEffect, useState } from 'react';
import RecipeDetail from './RecipeDetail';

const RecipeDetailContainer = props => {
  const { match } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      console.log(match.params);
      setMounted(true);
    }
  }, [match, mounted]);

  return <RecipeDetail {...props} />;
};

export default RecipeDetailContainer;
