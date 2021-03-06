import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";
import DesktopNavbar from "../components/DesktopNavbar/DesktopNavbar";

import ConfirmationModal from "../components/reusable/ConfirmationModal/ConfirmationModal";
import Toast from "../components/reusable/Toast";
import Sidebar from "../components/Sidebar/Sidebar";
import useConfirmationModal from "../hooks/useConfirmationModal/useConfirmationModal";
import useResponsive from "../hooks/useResponsive";
import useToast from "../hooks/useToast";
import Loading from "../utils/Loading";
import ScrollToTop from "../utils/ScrollToTop";

const Layout: React.FC = ({ children }) => {
  const { isDesktop } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(() => {
    if (isDesktop) {
      return true;
    } else {
      return false;
    }
  });
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { toastStatus, handleCloseToast } = useToast();
  const { confirmationModalStatus } = useConfirmationModal();
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Close Toast after timeout
  useEffect(() => {
    if (toastStatus?.open) {
      setTimeout(() => {
        handleCloseToast?.();
      }, 3000);
    }
  }, [handleCloseToast, toastStatus?.open]);

  // Close Drawer when switching to mobile
  useEffect(() => {
    if (isDesktop) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [isDesktop]);

  // Scroll to top button config
  useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY >= 350) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener("scroll", checkScrolling);
    return () => {
      window.removeEventListener("scroll", checkScrolling);
    };
  }, []);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          Error Boundary
          <button onClick={() => resetErrorBoundary()}>Try again</button>
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      )}
      onReset={() => {
        window.location.reload();
      }}
    >
      <ContentContainer>
        <CSSTransition
          in={toastStatus?.open}
          classNames="error-toast"
          unmountOnExit
          timeout={200}
        >
          <Toast
            text={toastStatus!.text}
            btnText="Close"
            closeFunction={() => toastStatus?.fn()}
            type={toastStatus!.type}
          />
        </CSSTransition>
        <CSSTransition
          in={drawerOpen}
          timeout={250}
          classNames="side-menu"
          unmountOnExit
        >
          <Sidebar isDesktop={isDesktop} setDrawerOpen={setDrawerOpen} />
        </CSSTransition>
        <CSSTransition
          in={showScrollToTop}
          timeout={250}
          classNames="scroll-btn"
          unmountOnExit
        >
          <ScrollToTop />
        </CSSTransition>

        <ConfirmationModal
          isOpen={confirmationModalStatus!.open}
          closeFunction={confirmationModalStatus!.closeCb}
          desc={confirmationModalStatus!.desc}
          successButtonText="Confirm"
          successFunction={confirmationModalStatus!.successCb}
          title={confirmationModalStatus!.title}
        />

        <Content drawerOpen={drawerOpen}>
          <DesktopNavbar handleToggleDrawer={handleToggleDrawer} />
          <Suspense fallback={<Loading />}>
            <div className="body">{children}</div>
          </Suspense>
        </Content>
      </ContentContainer>
    </ErrorBoundary>
  );
};

export default Layout;

const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display:block
  min-height: 100vh;
  `
);
const Content = styled.div<{ drawerOpen: boolean }>`
  min-height: 100vh;
  position: relative;

  transition: all 250ms ease-out;
  margin-left: 0;
  .body {
    padding: 1rem;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    ${(props) =>
      props.drawerOpen &&
      css`
        margin-left: 300px;
      `}
  }
`;
