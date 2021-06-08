import styled from "styled-components";
import Grid, { GridWrapper } from "../../StyledComponents/Grid";
import Hr from "../../StyledComponents/Hr";
import CreateProductCategories from "./CreateProductCategories";
import ProductDescription from "./ProductDescription";
import CreateProductImage from "./CreateProductImage";
import CreateProductNameAndDescription from "./CreateProductNameAndDescription";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import Flex from "../../StyledComponents/Flex";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import BlueButton from "../../reusable/BlueButton";

export interface firstTabInfo {
  category_id: number[];
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  slug: string;
  images: File[];
}

const CreateProductGeneralInfo = () => {
  const { updateData, setActiveTab } = useContext(NewProductContext);
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<firstTabInfo>();
  const onSubmit: SubmitHandler<firstTabInfo> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(watch());
  };
  const onError: SubmitErrorHandler<firstTabInfo> = (errors) => {
    console.log(errors);
  };

  return (
    <Container>
      <Flex justify="flex-end">
        <BlueButton
          onClick={handleSubmit(onSubmit, onError)}
          type="submit"
          title="Next"
        />
      </Flex>
      <Grid cols="1fr 1fr" gap="1rem">
        <CreateProductNameAndDescription register={register} errors={errors} />

        <CreateProductCategories control={control} errors={errors} />
      </Grid>

      <Hr />
      <CreateProductImage
        setValue={setValue}
        control={control}
        errors={errors}
      />
      {/* <ProductDescription /> */}
    </Container>
  );
};

export default CreateProductGeneralInfo;
const Container = styled.div`
  ${GridWrapper} {
    margin-bottom: 2rem;
  }
  /* background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.75rem;
  border-radius: 5px;
  align-self: flex-start; */
`;
