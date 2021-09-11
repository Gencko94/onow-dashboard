import Grid from "../../StyledComponents/Grid";
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

  quantity: string | "unlimited";
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

      slug: formValues?.slug,
      sku: formValues?.sku,
    },
  });
  const onSubmit: SubmitHandler<firstTabInfo> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(data);
  };
  const onError: SubmitErrorHandler<firstTabInfo> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button type="submit" color="blue" withTransition>
            Next
          </Button>
        </Flex>
        <Grid columns="repeat(auto-fit,minmax(350px,1fr))" gap="1rem">
          <CreateProductNameAndDescription />

          <CreateProductCategories />
        </Grid>

        {/* <CreateProductImage /> */}
        {/* <ProductDescription /> */}
      </form>
    </FormProvider>
  );
};

export default CreateProductGeneralInfo;
