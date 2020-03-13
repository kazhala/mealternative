/*
  get the root path of the current location
*/

const useRootPath = locationPathname => {
  const re = /^(\/\w*){1}\/.*$/;
  const rootPathname = locationPathname.match(re)[1];
  return rootPathname;
};

export default useRootPath;
