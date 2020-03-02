/*
  custom hooks to check scroll behavior
*/

const useScroll = () => {
  const handleScroll = (event, isLoadable, loadMore) => {
    if (isLoadable) {
      const totalHeight =
        event.target.scrollHeight - Math.ceil(event.target.scrollTop);
      const heightDifference = Math.abs(
        totalHeight - event.target.clientHeight
      );
      if (heightDifference <= 1) {
        loadMore();
      }
    }
  };
  return handleScroll;
};

export default useScroll;
