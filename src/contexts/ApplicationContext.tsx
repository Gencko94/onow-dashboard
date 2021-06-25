import { createContext, useState } from "react";
interface ApplicationContextProps {
  toastStatus: TOAST_STATUS;
  setToastStatus: React.Dispatch<React.SetStateAction<TOAST_STATUS>>;
  handleCloseToast: () => void;
  confirmationModalStatus: CONFIRMATION_MODAL_STATUS;
  setConfirmationModalStatus: React.Dispatch<
    React.SetStateAction<CONFIRMATION_MODAL_STATUS>
  >;
  handleCloseConfirmationModal: () => void;
}
export type TOAST_STATUS = {
  open: boolean;
  text: string;
  fn: () => void;
  type: "success" | "error";
};
export type CONFIRMATION_MODAL_STATUS = {
  open: boolean;
  title: string;
  desc: string;
  successCb: () => void;
  closeCb: () => void;
};
export const ApplicationProvider = createContext<
  Partial<ApplicationContextProps>
>({});
const ApplicationContext: React.FC = ({ children }) => {
  const [confirmationModalStatus, setConfirmationModalStatus] =
    useState<CONFIRMATION_MODAL_STATUS>({
      open: false,
      closeCb: () => {},
      successCb: () => {},
      desc: "",
      title: "",
    });
  const [toastStatus, setToastStatus] = useState<TOAST_STATUS>({
    open: false,
    text: "",
    fn: () => {},
    type: "success",
  });
  const handleCloseConfirmationModal = () => {
    setConfirmationModalStatus((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const handleCloseToast = () => {
    setToastStatus((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <ApplicationProvider.Provider
      value={{
        toastStatus,
        setToastStatus,
        handleCloseToast,
        handleCloseConfirmationModal,
        confirmationModalStatus,
        setConfirmationModalStatus,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
