import React, { Suspense, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import useResponsive from '../../hooks/useResponsive';
import Loading from '../../utils/Loading';

const LayoutDesktop: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { isDesktop } = useResponsive();
  return (
    <ContentContainer>
      <CSSTransition
        in={drawerOpen}
        timeout={250}
        classNames="side-menu"
        unmountOnExit
      >
        <ClickAwayListener
          onClickAway={() => {
            if (!isDesktop) setDrawerOpen(false);
          }}
        >
          <Sidebar />
        </ClickAwayListener>
      </CSSTransition>

      <Content drawerOpen={drawerOpen}>
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
  width:100vw;
  @media ${breakpoints.md}{
  }
  `
);
const Content = styled.div<{ drawerOpen: boolean }>(
  ({ theme: { breakpoints }, drawerOpen }) => `
  padding: 0 0.5rem;
  z-index:2;
  min-height:100vh;
  position:relative;
  background-color:#f3f3f3;
  transition: all 250ms ease-out;
  margin-left:0;
  @media ${breakpoints.md}{
    
    ${
      drawerOpen &&
      css`
        margin-left: 300px;
      `
    }
  }
  `
);
