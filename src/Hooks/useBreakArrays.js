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
    right: [],
    mid: [],
    big: []
  });

  // based on array and size passed, split the array
  useEffect(() => {
    if (oldArray.length > 0) {
      if (querySize === 20) {
        // split into 4 arrays for desktop screens
        const reducedRecipe = oldArray.reduce(
          (prev, curr, idx, self) => {
            if (
              prev.left.length === prev.right.length &&
              prev.left.length === prev.mid.length &&
              prev.left.length === prev.big.length
            ) {
              prev.left.push(curr);
            } else if (
              prev.right.length === prev.mid.length &&
              prev.right.length === prev.big.length
            ) {
              prev.right.push(curr);
            } else if (prev.mid.length === prev.big.length) {
              prev.mid.push(curr);
            } else {
              prev.big.push(curr);
            }
            return prev;
          },
          { left: [], right: [], mid: [], big: [] }
        );
        setReturnArray(prevArray => ({
          ...prevArray,
          left: [...reducedRecipe.left],
          right: [...reducedRecipe.right],
          mid: [...reducedRecipe.mid],
          big: [...reducedRecipe.big]
        }));
      } else if (querySize === 15) {
        // ipad screen split to three
        const reducedRecipe = oldArray.reduce(
          (prev, curr, idx, self) => {
            if (
              prev.left.length === prev.right.length &&
              prev.left.length === prev.mid.length
            ) {
              prev.left.push(curr);
            } else if (prev.right.length === prev.mid.length) {
              prev.right.push(curr);
            } else {
              prev.mid.push(curr);
            }
            return prev;
          },
          { left: [], right: [], mid: [] }
        );
        setReturnArray(prevArray => ({
          ...prevArray,
          left: [...reducedRecipe.left],
          right: [...reducedRecipe.right],
          mid: [...reducedRecipe.mid],
          big: []
        }));
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
          right: [...reducedRecipe.right],
          mid: [],
          big: []
        }));
      }
    }
  }, [oldArray, querySize]);

  return returnArray;
};

export default useBreakArrays;
