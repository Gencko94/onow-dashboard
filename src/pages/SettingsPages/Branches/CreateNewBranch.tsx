import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import HeaderContainer from "../../../components/reusable/HeaderContainer";
import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";

import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import Flex from "../../../components/StyledComponents/Flex";
import useToast from "../../../hooks/useToast";

import { NEW_BRANCH } from "../../../interfaces/settings/branches/branches";
import extractError from "../../../utils/extractError";
import { createBranch } from "../../../utils/queries";

const CreateNewBranch = () => {
  const history = useHistory();
  const { handleCloseToast, setToastStatus } = useToast();
  const { mutateAsync, isLoading } = useMutation(createBranch);
  const methods = useForm<NEW_BRANCH>({
    defaultValues: {
      cod_cost: "0",
      busy: false,
      cod_enabled: true,
      active: 1,
      delivery_enabled: true,
      pickup_enabled: true,
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

  const onSubmit: SubmitHandler<NEW_BRANCH> = async (data) => {
    console.log(data);
    try {
      const regex = /^0+(?!$)/;
      // await mutateAsync(data);
      // setToastStatus?.({
      //   open: true,
      //   fn: handleCloseToast!,
      //   text: "Branch Created Successfully",
      //   type: "success",
      // });
      // history.replace("/settings/branches");
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
      } else {
        console.log(unknownError);
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          children={[
            {
              name: { ar: "الإعدادات", en: "Settings" },
              target: "/settings",
            },
            {
              name: { ar: "فروع المتجر", en: "Store Branches" },
              target: "/settings/branches",
            },
            {
              name: { ar: "إضافة فرع جديد", en: "Create New Branch" },
              target: "",
            },
          ]}
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
            isLoading={isLoading}
            disabled={isLoading}
            text="Submit Data"
            type="submit"
          />
        </Flex>
      </HeaderContainer>

      <FormProvider {...methods}>
        <BranchInformation />
        <BranchLocation />
        <BranchWorkingHours />
      </FormProvider>
    </form>
  );
};

export default CreateNewBranch;
