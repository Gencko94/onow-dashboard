import { useContext } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import Flex from "../../StyledComponents/Flex";
import Hr from "../../StyledComponents/Hr";
import CreateProductBranches from "./CreateProductBranches";
import CreateProductOrdering from "./CreateProductOrdering";

import Button from "../../reusable/Button";
import { NEW_PRODUCT } from "../../../interfaces/products/create-new-product";

export interface thirdTabProps {
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };
  allow_side_notes: boolean;
  allow_attachments: boolean;
  active: 0 | 1;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
}
interface IProps {
  submitForm: (product: any) => void;
}
const CreateProductOrderingAndBranchAvailability = ({ submitForm }: IProps) => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const methods = useForm<thirdTabProps>({
    defaultValues: {
      allow_attachments: formValues?.allow_attachments,
      allow_side_notes: formValues?.allow_side_notes,
      branch_availability: formValues?.branch_availability,
      max_qty_per_user: formValues?.max_qty_per_user,
      prep_time: formValues?.prep_time,
      active: formValues?.active,
    },
  });
  const onSubmit: SubmitHandler<thirdTabProps> = (data) => {
    updateData?.(data);

    submitForm({ ...formValues, ...data });
  };
  const onError: SubmitErrorHandler<thirdTabProps> = (errors) => {
    console.log(errors);
  };
  return (
    <FormProvider {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button
            margin="0 0.5rem"
            bg="blue"
            padding=" 0.5rem"
            textSize="0.9rem"
            text="Back"
            onClick={() => {
              updateData?.(methods.watch());
              setActiveTab?.(1);
            }}
            withRipple
            withTransition
          />
          <Button
            withRipple
            withTransition
            type="submit"
            bg="green"
            padding=" 0.5rem"
            textSize="0.9rem"
            text="Create New Product"
            onClick={() => {
              console.log("hi");
              methods.handleSubmit(onSubmit, onError);
            }}
          />
        </Flex>

        <CreateProductOrdering />
        <Hr />
        <CreateProductBranches />
      </Container>
    </FormProvider>
  );
};

export default CreateProductOrderingAndBranchAvailability;
const Container = styled.form`
  background-color: #fff;
`;
