import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import HeaderContainer from "../../../components/reusable/HeaderContainer";
import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";

import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import Flex from "../../../components/StyledComponents/Flex";

import { NEW_BRANCH } from "../../../interfaces/settings/branches/branches";

const CreateNewBranch = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    control,
  } = useForm<NEW_BRANCH>({
    defaultValues: {
      working_hours: {
        saturday: { enabled: true, from: "09:00", to: "21:00" },
        sunday: { enabled: true, from: "09:00", to: "21:00" },
        monday: { enabled: true, from: "09:00", to: "21:00" },
        tuesday: { enabled: true, from: "09:00", to: "21:00" },
        wednesday: { enabled: true, from: "09:00", to: "21:00" },
        thursday: { enabled: true, from: "09:00", to: "21:00" },
        friday: { enabled: true, from: "09:00", to: "21:00" },
      },
    },
  });

  const onSubmit: SubmitHandler<NEW_BRANCH> = (data: NEW_BRANCH) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Create New Branch"
          parentLabel="Branches"
          parentTarget="/settings/branches"
        />
        <Flex justify="flex-end">
          <Button
            padding="0.5rem"
            textSize="0.9rem"
            bg="green"
            Icon={BiPlus}
            iconSize={25}
            withRipple
            withTransition
            text="Submit Data"
            type="submit"
          />
        </Flex>
      </HeaderContainer>

      <BranchInformation
        errors={errors}
        register={register}
        control={control}
      />
      <BranchLocation
        setValue={setValue}
        errors={errors}
        register={register}
        control={control}
      />
      <BranchWorkingHours
        errors={errors}
        register={register}
        control={control}
      />
    </form>
  );
};

export default CreateNewBranch;
