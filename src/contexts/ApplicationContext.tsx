import { createContext, useState } from "react";
interface ApplicationContextProps {
  toastStatus: TOAST_STATUS;
  setToastStatus: React.Dispatch<React.SetStateAction<TOAST_STATUS>>;
  handleCloseToast: () => void;
}
export type TOAST_STATUS = {
  open: boolean;
  text: string;
  fn: () => void;
  type: "success" | "error";
};
export const ApplicationProvider = createContext<
  Partial<ApplicationContextProps>
>({});
const ApplicationContext: React.FC = ({ children }) => {
  const [toastStatus, setToastStatus] = useState<TOAST_STATUS>({
    open: false,
    text: "",
    fn: () => {},
    type: "success",
  });
  const handleCloseToast = () => {
    setToastStatus({
      fn: () => {},
      open: false,
      text: "",
      type: "success",
    });
  };
  return (
    <ApplicationProvider.Provider
      value={{ toastStatus, setToastStatus, handleCloseToast }}
    >
      {children}
    </ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
