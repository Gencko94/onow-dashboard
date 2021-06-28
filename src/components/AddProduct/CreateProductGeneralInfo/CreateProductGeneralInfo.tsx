import styled from "styled-components";
import Grid, { GridWrapper } from "../../StyledComponents/Grid";
import Hr from "../../StyledComponents/Hr";
import CreateProductCategories from "./CreateProductCategories";
import ProductDescription from "./ProductDescription";
import CreateProductImage from "./CreateProductImage";
import CreateProductNameAndDescription from "./CreateProductNameAndDescription";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useContext } from "react";
import Flex from "../../StyledComponents/Flex";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import Button from "../../reusable/Button";

export interface firstTabInfo {
  category_id: number;
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  slug: string;
  images: File[];
  thumbnail: File;
  quantity: number | "unlimited";
  sku: string;
}

const CreateProductGeneralInfo = () => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const methods = useForm<firstTabInfo>({
    defaultValues: {
      category_id: formValues?.category_id,
      description: formValues?.description,
      quantity: formValues?.quantity,
      name: formValues?.name,
      thumbnail: formValues?.thumbnail,
      images: formValues?.images,
      slug: formValues?.slug,
      sku: formValues?.sku,
    },
  });
  const onSubmit: SubmitHandler<firstTabInfo> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(methods.watch());
  };
  const onError: SubmitErrorHandler<firstTabInfo> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <Flex justify="flex-end">
          <Button
            type="submit"
            onClick={methods.handleSubmit(onSubmit, onError)}
            text="Next"
            bg="blue"
            padding="0.5rem"
            textSize="0.9rem"
          />
        </Flex>
        <Grid cols="1fr 1fr" gap="1rem">
          <CreateProductNameAndDescription />

          <CreateProductCategories />
        </Grid>

        <Hr />
        <CreateProductImage />
        {/* <ProductDescription /> */}
      </Container>
    </FormProvider>
  );
};

export default CreateProductGeneralInfo;
const Container = styled.div`
  ${GridWrapper} {
    margin-bottom: 2rem;
  }
`;
