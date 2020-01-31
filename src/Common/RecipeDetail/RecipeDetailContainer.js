import React, { useEffect, useState } from 'react';
import RecipeDetail from './RecipeDetail';

const RecipeDetailContainer = props => {
  const { match, history } = props;
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!mounted) {
      console.log(match.params);
      setMounted(true);
    }
  }, [match, mounted]);

  const handleBack = () => {
    setShowModal(false);
    setTimeout(() => {
      history.push('/recipes');
    }, 1000);
  };

  return (
    <RecipeDetail showModal={showModal} handleBack={handleBack} {...props} />
  );
};

export default RecipeDetailContainer;
