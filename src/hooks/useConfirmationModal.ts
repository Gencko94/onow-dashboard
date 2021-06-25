import { useContext } from "react";
import { ApplicationProvider } from "../contexts/ApplicationContext";

const useConfirmationModal = () => {
  const {
    confirmationModalStatus,
    setConfirmationModalStatus,
    handleCloseConfirmationModal,
  } = useContext(ApplicationProvider);
  return {
    confirmationModalStatus,
    setConfirmationModalStatus,
    handleCloseConfirmationModal,
  };
};

export default useConfirmationModal;
