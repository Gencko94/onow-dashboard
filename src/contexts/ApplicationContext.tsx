import { useCallback } from "react";
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
  globalSearchBarValue: string;
  handleChangeGlobalSearchBar: (search: string) => void;
  globalSearchType: "order" | "customer" | "product";
  handleChangeGlobalSearchType: (
    type: "order" | "customer" | "product"
  ) => void;
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
  const [globalSearchBarValue, setGlobalSearchBarValue] = useState("");
  const [globalSearchType, setGlobalSearchType] = useState<
    "order" | "customer" | "product"
  >("product");
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

  const handleCloseConfirmationModal = useCallback(() => {
    setConfirmationModalStatus((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);
  const handleCloseToast = useCallback(() => {
    setToastStatus((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);
  const handleChangeGlobalSearchBar = useCallback((search: string) => {
    setGlobalSearchBarValue(search);
  }, []);
  const handleChangeGlobalSearchType = useCallback(
    (type: "order" | "customer" | "product") => {
      setGlobalSearchType(type);
    },
    []
  );
  return (
    <ApplicationProvider.Provider
      value={{
        toastStatus,
        setToastStatus,
        handleCloseToast,
        handleCloseConfirmationModal,
        confirmationModalStatus,
        setConfirmationModalStatus,
        globalSearchBarValue,
        handleChangeGlobalSearchBar,
        handleChangeGlobalSearchType,
        globalSearchType,
      }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
