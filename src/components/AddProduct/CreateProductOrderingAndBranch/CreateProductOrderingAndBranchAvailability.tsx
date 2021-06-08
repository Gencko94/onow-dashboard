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
import BlueButton from "../../reusable/BlueButton";
import AddButton from "../../reusable/AddButton";

export interface thirdTabProps {
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
}

const CreateProductOrderingAndBranchAvailability = () => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const methods = useForm<thirdTabProps>({
    defaultValues: {
      allow_attachments: formValues?.allow_attachments,
      allow_side_notes: formValues?.allow_side_notes,
      branch_availability: formValues?.branch_availability,
      max_qty_per_user: formValues?.max_qty_per_user,
      prep_time: formValues?.prep_time,
    },
  });
  const onSubmit: SubmitHandler<thirdTabProps> = (data) => {
    updateData?.(data);
  };
  const onError: SubmitErrorHandler<thirdTabProps> = (errors) => {
    console.log(errors);
  };
  return (
    <FormProvider {...methods}>
      <Flex justify="flex-end">
        <BlueButton
          onClick={() => {
            console.log(methods.watch());
            updateData?.(methods.watch());
            setActiveTab?.(1);
          }}
          type="button"
          title="back"
        />
        <AddButton
          cb={methods.handleSubmit(onSubmit, onError)}
          title="Create New Product"
        />
      </Flex>
      <Container onSubmit={methods.handleSubmit(onSubmit, onError)}>
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
