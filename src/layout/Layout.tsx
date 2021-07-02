import React, { Suspense, useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";
import DesktopNavbar from "../components/DesktopNavbar/DesktopNavbar";
import ConfirmationModal from "../components/reusable/ConfirmationModal";
import Toast from "../components/reusable/Toast";
import Sidebar from "../components/Sidebar/Sidebar";
import useConfirmationModal from "../hooks/useConfirmationModal";
import useResponsive from "../hooks/useResponsive";
import useToast from "../hooks/useToast";
import Loading from "../utils/Loading";

const Layout: React.FC = ({ children }) => {
  const { isDesktop } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(() => {
    if (isDesktop) {
      return true;
    } else {
      return false;
    }
  });
  const { toastStatus, handleCloseToast } = useToast();
  const { confirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    if (toastStatus?.open) {
      setTimeout(() => {
        handleCloseToast?.();
      }, 3000);
    }
  }, [toastStatus?.open]);
  useEffect(() => {
    if (isDesktop) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [isDesktop]);
  return (
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
      <ConfirmationModal
        isOpen={confirmationModalStatus!.open}
        closeFunction={confirmationModalStatus!.closeCb}
        desc={confirmationModalStatus!.desc}
        successButtonText="Delete"
        successFunction={confirmationModalStatus!.successCb}
        title="Delete Product"
        styles={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />

      <Content drawerOpen={drawerOpen}>
        <DesktopNavbar handleToggleDrawer={handleToggleDrawer} />
        <Suspense fallback={<Loading />}>
          <div className="body">{children}</div>
        </Suspense>
      </Content>
    </ContentContainer>
  );
};

export default Layout;

const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  display:block
  min-height: 100vh;
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
  .body {
    padding:0.5rem;
  }
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
