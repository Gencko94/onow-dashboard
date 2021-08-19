import styled from "styled-components";

import ModalHead from "../Modal/ModalHead";

import { useMutation, useQueryClient } from "react-query";
import { toggleMaintenanceMode } from "../../utils/queries/settingsQueries";
import GithubInput from "../reusable/Inputs/GithubInput";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { USER } from "../../interfaces/auth/auth";
import { up } from "../../utils/themes";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useTransition } from "@react-spring/web";

interface ModalProps {
  /**
   * The Close Function
   */
  closeFunction: () => void;

  /**
   * Boolean controlling the modal state
   */
  isOpen: boolean;
}

const StoreMaintenanceModal = ({ closeFunction, isOpen }: ModalProps) => {
  const { user } = useContext(AuthProvider);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(toggleMaintenanceMode, {
    onSuccess: (_, code) => {
      queryClient.setQueryData<USER | undefined>("auth", (prev) => {
        if (prev) {
          return {
            ...prev,
            store: {
              ...prev.store,
              maintenance: code,
            },
          };
        }
      });
    },
  });
  const handleToggleMaintenance = async (status: boolean) => {
    await mutateAsync(status);
  };
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <AnimatedDialogOverlay
              onDismiss={closeFunction}
              style={{ opacity: styles.opacity }}
            >
              <AnimatedDialogContent
                aria-labelledby="dialog-title"
                style={{
                  transform: styles.y.to(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                }}
              >
                <ModalHead
                  closeFunction={closeFunction}
                  title="Store Maintenance"
                />

                <div className="content">
                  <GithubInput
                    checked={user!.store.maintenance}
                    label="Toggle Maintenance Mode"
                    desc="In Maintenance Mode , Your store will show a maintenance banner and users will not able to view your website contents"
                    onChange={() => {
                      if (user!.store.maintenance) {
                        handleToggleMaintenance(false);
                      } else {
                        handleToggleMaintenance(true);
                      }
                    }}
                  />
                </div>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
};

export default StoreMaintenanceModal;

const AnimatedDialogContent = styled(animated(DialogContent))(
  ({ theme: { breakpoints, subtleBackground } }) => `
  min-width:300px;
  width:300px;  
  background-color:${subtleBackground};
  .content {
    padding:1rem;
  }
  ${up(breakpoints.md)}{
    min-width:400px;
   
  }
  ${up(breakpoints.lg)}{
    min-width:500px;
   
  }

`
);

const AnimatedDialogOverlay = animated(DialogOverlay);
