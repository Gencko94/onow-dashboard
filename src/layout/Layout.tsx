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
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { toastStatus, handleCloseToast } = useToast();
  const { confirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { isDesktop } = useResponsive();
  useEffect(() => {
    if (toastStatus?.open) {
      setTimeout(() => {
        handleCloseToast?.();
      }, 3000);
    }
  }, [toastStatus?.open]);
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
        <ClickAwayListener
          onClickAway={() => {
            if (!isDesktop) setDrawerOpen(false);
          }}
        >
          <Sidebar />
        </ClickAwayListener>
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
          <div className="page-container">{children}</div>
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
  .page-container {
    padding:0.5rem;
  }
  @media ${breakpoints.md}{
    
    .page-container {
      padding:0.75rem;
    }
    
    ${
      drawerOpen &&
      css`
        margin-left: 300px;
      `
    }
  }
  `
);
