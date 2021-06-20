import { useContext } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import { BRANCH_ADDRESS } from "../../../../interfaces/settings/branches-warehouses/branches-warehouses";
import { NewBranchContext } from "../../../../pages/SettingsPages/Branches/CreateNewBranch";
import BlueButton from "../../../reusable/BlueButton";
import Flex from "../../../StyledComponents/Flex";
import Hr from "../../../StyledComponents/Hr";
import NewBranchInformation from "./NewBranchInformation";
import NewBranchLocation from "./NewBranchLocation";

export interface firstBranchTabInfo {
  name: {
    ar: string;
    en: string;
  };
  cod_cost: string;
  cod_enabled: boolean;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  address: BRANCH_ADDRESS;
  contact_info: {
    landline: string;
    mobile: string;
    whatsapp: string;
  };
}
const NewBranchInfoAndLocation = () => {
  const { updateData, setActiveTab, formValues } = useContext(NewBranchContext);
  const methods = useForm<firstBranchTabInfo>({
    defaultValues: {
      address: formValues?.address,
      contact_info: formValues?.contact_info,
      name: formValues?.name,
    },
  });
  const onSubmit: SubmitHandler<firstBranchTabInfo> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(methods.watch());
  };
  const onError: SubmitErrorHandler<firstBranchTabInfo> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <Flex justify="flex-end">
          <BlueButton
            onClick={methods.handleSubmit(onSubmit, onError)}
            type="submit"
            title="Next"
          />
        </Flex>

        <NewBranchInformation />

        <NewBranchLocation />

        <Hr />
      </Container>
    </FormProvider>
  );
};

export default NewBranchInfoAndLocation;
const Container = styled.div``;
