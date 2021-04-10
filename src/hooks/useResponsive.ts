import { useMediaQuery } from 'react-responsive';

const useResponsive = (type?: string) => {
  const isDesktop = useMediaQuery({ query: `(min-width: 768px)` });

  return { isDesktop };
};

export default useResponsive;
