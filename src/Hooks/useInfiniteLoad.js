/*
  custom hooks to check scroll behavior
*/

const useInfiniteLoad = () => {
  const handleScroll = (event, isLoadable, loadMore, isDesktop) => {
    if (!isDesktop) {
      return;
    }
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

export default useInfiniteLoad;
