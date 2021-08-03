import styled from "styled-components";

import ModalHead from "../Modal/ModalHead";

import { useMutation, useQueryClient } from "react-query";
import { toggleMaintenanceMode } from "../../utils/queries/settingsQueries";
import GithubInput from "../reusable/Inputs/GithubInput";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { USER } from "../../interfaces/auth/auth";
import { ModalWrapper } from "../Modal/ModalWrapper";
import { up } from "../../utils/themes";

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
  return (
    <Modal>
      <ModalHead closeFunction={closeFunction} title="Store Maintenance" />
      <Body>
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
      </Body>
    </Modal>
  );
};

export default StoreMaintenanceModal;

const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:380px 20px;
  position:fixed;
  min-width:300px;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};
  ${up(breakpoints.md)}{
    inset:380px 250px;
    min-width:400px;
  }
  ${up(breakpoints.lg)}{
    inset:380px 350px;
  }
  ${up(breakpoints.xl)}{
    inset:380px 450px;
  
  `
);
const Body = styled.div(
  ({ theme: { breakpoints, border } }) => `

  width: 100%;
  height: 100%;
  display: grid;
  padding: 0.75rem;
  grid-template-columns: 1fr;

  grid-template-rows: auto 1fr auto;
  ${up(breakpoints.md)}{
   
   padding:1rem;
  }
  
  `
);
