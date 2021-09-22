import Grid from "../../StyledComponents/Grid";
import CreateProductCategories from "./CreateProductCategories";

import CreateProductNameAndDescription from "./CreateProductNameAndDescription";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useContext } from "react";
import Flex from "../../StyledComponents/Flex";
import Button from "../../reusable/Button";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";

export interface firstTabInfo {
  category_id: number[];
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
      category_id: formValues?.category_id || [],
      description: formValues?.description,
      quantity: formValues?.quantity || "unlimited",
      name: formValues?.name,

      slug: formValues?.slug,
      sku: formValues?.sku,
    },
  });
  const onSubmit: SubmitHandler<firstTabInfo> = (data) => {
    updateData?.(data);
    setActiveTab?.(1);
  };
  const onError: SubmitErrorHandler<firstTabInfo> = (errors) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button data-testid="pgi-n" type="submit" color="blue" withTransition>
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
