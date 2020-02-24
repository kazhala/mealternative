export const handleScroll = (event, isLoadable, loadMore) => {
  if (isLoadable) {
    const isBottom =
      event.target.scrollHeight - Math.ceil(event.target.scrollTop) ===
      event.target.clientHeight;
    isBottom && loadMore();
  }
};
