import styled from "styled-components";
import ReactModal from "react-modal";

import ModalHead from "../reusable/ModalHead";
import { FlexWrapper } from "../StyledComponents/Flex";
import { useMutation, useQueryClient } from "react-query";
import { toggleMaintenanceMode } from "../../utils/queries/settingsQueries";
import GithubInput from "../reusable/Inputs/GithubInput";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { USER } from "../../interfaces/auth/auth";

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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeFunction}
      closeTimeoutMS={200}
      className="modal maintenance-modal"
    >
      <Body>
        <ModalHead closeFunction={closeFunction} title="Store Maintenance" />
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
    </ReactModal>
  );
};

export default StoreMaintenanceModal;

const Body = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  .content {
    padding: 1rem;
  }

  ${FlexWrapper} {
    border-top: ${(props) => props.theme.border};
  }
`;
