import { createContext, SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";

import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import NewBranchInfoAndLocation from "../../../components/SettingsPage/StoreBranches/CreateNewBranch/NewBranchInfoAndLocation";
import NewBranchTabs from "../../../components/SettingsPage/StoreBranches/CreateNewBranch/NewBranchTabs";
import { NEW_BRANCH } from "../../../interfaces/settings/branches-warehouses/branches-warehouses";
type ContextProps = {
  activeTab: 0 | 1 | 2;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2>>;
  updateData: (data: any) => void;
  formValues: Partial<NEW_BRANCH>;
};

export const NewBranchContext = createContext<Partial<ContextProps>>({});

const CreateNewBranch = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [formValues, setFormValues] = useState<Partial<NEW_BRANCH>>({});
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    control,
  } = useForm<NEW_BRANCH>({
    defaultValues: {
      cod_enabled: true,
      cod_cost: 0,
      working_hours: {
        saturday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        sunday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        monday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        tuesday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        wednesday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        thursday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
        friday: {
          enabled: true,
          from: "00:00",
          to: "12:00",
        },
      },
    },
  });
  const onSubmit = (data: NEW_BRANCH) => {
    console.log(data);
  };
  const updateData = (data: any) => {
    setFormValues({
      ...formValues,
      ...data,
    });
  };
  return (
    <NewBranchContext.Provider
      value={{ activeTab, setActiveTab, updateData, formValues }}
    >
      <Breadcrumbs
        childLabel="Create New Branch"
        parentLabel="Branches"
        parentTarget="/settings/branches"
      />
      <NewBranchTabs />
      <Wrapper>
        {activeTab === 0 && <NewBranchInfoAndLocation />}
        {activeTab === 1 && (
          <BranchWorkingHours
            errors={errors}
            register={register}
            control={control}
          />
        )}
      </Wrapper>
    </NewBranchContext.Provider>
  );
};

export default CreateNewBranch;

const Wrapper = styled.div`
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;
