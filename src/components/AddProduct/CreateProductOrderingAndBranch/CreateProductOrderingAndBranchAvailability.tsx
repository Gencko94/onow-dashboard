import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styled from "styled-components";
import Hr from "../../StyledComponents/Hr";
import CreateProductBranches from "./CreateProductBranches";
import CreateProductOrdering from "./CreateProductOrdering";

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
  const methods = useForm<thirdTabProps>();
  const onSubmit: SubmitHandler<thirdTabProps> = (data) => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<thirdTabProps> = (errors) => {
    console.log(errors);
  };
  return (
    <FormProvider {...methods}>
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
