/*
  custom hooks for breaking arrays into 4 parts based on screen size
*/

// react
import { useEffect, useState } from 'react';

const useBreakArrays = (oldArray, querySize) => {
  // left side array and rightside array
  // mid for ipad screen size
  // big for desktop screen size
  const [returnArray, setReturnArray] = useState({
    left: [],
    right: []
  });

  // based on array and size passed, split the array
  useEffect(() => {
    if (oldArray.length > 0) {
      if (querySize > 10) {
        return;
      } else {
        // if mobile screen, split to 2 arrays
        const reducedRecipe = oldArray.reduce(
          (prev, curr, idx, self) => {
            if (idx % 2 === 0) {
              prev.left.push(curr);
            } else {
              prev.right.push(curr);
            }
            return prev;
          },
          { left: [], right: [] }
        );
        setReturnArray(prevArray => ({
          ...prevArray,
          left: [...reducedRecipe.left],
          right: [...reducedRecipe.right]
        }));
      }
    }
  }, [oldArray, querySize]);

  return returnArray;
};

export default useBreakArrays;
