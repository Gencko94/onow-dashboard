import { createContext, Dispatch, SetStateAction, useState } from "react";
type ContextProps = {
  activeTab: 0 | 1 | 2 | 3;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
  updateData: (data: any) => void;
  formValues: any;
};
export const NewProductContext = createContext<Partial<ContextProps>>({});
const NewProductProvider: React.FC = ({ children }) => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
  const [formValues, setFormValues] = useState({
    allow_attachments: false,
    allow_side_notes: true,
    price_by_options: false,
    branch_availability: {
      all: true,
      branches: [] as number[],
    },
    thumbnail: undefined,
    options: [],
    images: [],
    max_qty_per_user: "0",
    active: 1,
    quantity: "unlimited",
    category_id: [],
  });
  const updateData = (data: any) => {
    console.log(formValues, "old");
    setFormValues((prev) => ({
      ...prev,
      ...data,
    }));
  };
  return (
    <NewProductContext.Provider
      value={{ activeTab, setActiveTab, updateData, formValues }}
    >
      {children}
    </NewProductContext.Provider>
  );
};

export default NewProductProvider;
