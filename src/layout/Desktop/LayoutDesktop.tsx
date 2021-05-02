import React, { Suspense, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import useResponsive from '../../hooks/useResponsive';
import Loading from '../../utils/Loading';

const LayoutDesktop: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log(children);
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { isDesktop } = useResponsive();
  return (
    <ContentContainer>
      {isDesktop && <Sidebar />}
      <CSSTransition
        in={drawerOpen}
        timeout={100}
        classNames="side-menu"
        unmountOnExit
      >
        <ClickAwayListener onClickAway={() => setDrawerOpen(false)}>
          <SideMenu>
            <Sidebar />
          </SideMenu>
        </ClickAwayListener>
      </CSSTransition>

      <Content>
        <DesktopNavbar handleToggleDrawer={handleToggleDrawer} />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Content>
    </ContentContainer>
  );
};

export default LayoutDesktop;

const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display:block
  min-height: 100vh;
  @media ${breakpoints.md}{
    display: flex;
  }
  `
);
const Content = styled.div(
  ({ theme: { breakpoints } }) => `
  padding: 0 0.5rem;
  @media ${breakpoints.md}{
    width: calc(100vw - 300px);
  }
  `
);
const SideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 10px;
  /* height: 100vh; */
  z-index: 999;
`;
