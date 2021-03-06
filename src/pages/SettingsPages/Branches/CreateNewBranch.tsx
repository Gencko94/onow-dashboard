import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import Spacer from "../../../components/reusable/Spacer";

import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";

import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import Flex from "../../../components/StyledComponents/Flex";
import Heading from "../../../components/StyledComponents/Heading";
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
      enable_pickup: true,
      address: { coords: {} },
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
    try {
      // const regex = /^0+(?!$)/;
      await mutateAsync({ ...data, country_id: 1 });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Branch Created Successfully",
        type: "success",
      });
      history.replace("/settings/branches");
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
      } else {
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
      <Heading tag="h5" type="large-title">
        Create New Branch
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "??????????????????", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "???????? ????????????", en: "Store Branches" },
            target: "/settings/branches",
          },
          {
            name: { ar: "?????????? ?????? ????????", en: "Create New Branch" },
            target: "",
          },
        ]}
      />
      <Flex justify="flex-end">
        <Button
          color="green"
          withTransition
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
        >
          Submit
        </Button>
      </Flex>
      <Spacer size={40} />

      <FormProvider {...methods}>
        <BranchInformation />
        <Spacer size={40} />
        <BranchLocation />
        <Spacer size={40} />
        <BranchWorkingHours />
      </FormProvider>
    </form>
  );
};

export default CreateNewBranch;
