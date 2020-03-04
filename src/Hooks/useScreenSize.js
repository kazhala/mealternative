/*
  custom hooks to determine query size based on screen size
*/
import { useEffect, useState } from 'react';

const useScreenSize = (hugScreen, bigScreen, midScreen) => {
  const [querySize, setQuerySize] = useState(10);

  useEffect(() => {
    if (hugScreen) {
      setQuerySize(40);
    } else if (bigScreen) {
      setQuerySize(20);
    } else if (midScreen) {
      setQuerySize(15);
    } else {
      setQuerySize(10);
    }
  }, [hugScreen, bigScreen, midScreen]);

  return querySize;
};

export default useScreenSize;
