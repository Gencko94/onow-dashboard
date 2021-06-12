import { createContext } from "react";
interface ApplicationContextProps {}
export const ApplicationProvider = createContext<
  Partial<ApplicationContextProps>
>({});
const ApplicationContext: React.FC = ({ children }) => {
  return (
    <ApplicationProvider.Provider value={{}}></ApplicationProvider.Provider>
  );
};

export default ApplicationContext;
