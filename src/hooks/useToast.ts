import { useContext } from "react";
import { ApplicationProvider } from "../contexts/ApplicationContext";

const useToast = () => {
  const { toastStatus, handleCloseToast, setToastStatus } =
    useContext(ApplicationProvider);

  return {
    toastStatus,
    setToastStatus,
    handleCloseToast,
  };
};

export default useToast;
