import React from 'react';
import useResponsive from '../hooks/useResponsive';
const LayoutDesktop = React.lazy(() => import('./Desktop/LayoutDesktop'));
const LayoutMobile = React.lazy(() => import('./Mobile/LayoutMobile'));

const Layout: React.FC = ({ children }) => {
  const { isDesktop } = useResponsive();

  if (isDesktop) {
    return <LayoutDesktop>{children}</LayoutDesktop>;
  }
  return <LayoutMobile>{children}</LayoutMobile>;
};

export default Layout;
