import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { useMutation } from "react-query";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import { editProductGeneralInfo } from "../../../utils/queries/productQueries";
import Button from "../../reusable/Button";

import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import ProductCategories from "./ProductCategories";

import ProductNameAndDescription from "./ProductNameAndDescription";

interface IProps {
  data: PRODUCT;
}
export interface FORM_PROPS {
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  slug: string;
  category: { id: number; name: { [key: string]: string } };
  sku: string;
  quantity: string | "unlimited";
}
const ProductGeneralInformation = ({ data }: IProps) => {
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      name: data.name,
      description: data.description,
      slug: data.slug,
      quantity: data.quantity.toString(),
      category: data.category,
      sku: data.sku,
    },
  });
  // Edit Mutation
  const { mutateAsync, reset, isLoading } = useMutation(editProductGeneralInfo);
  const onSubmit: SubmitHandler<FORM_PROPS> = async (formData: FORM_PROPS) => {
    try {
      const regex = /^0+(?!$)/;
      await mutateAsync({
        ...formData,
        category: formData.category.id,
        quantity:
          formData.quantity === "unlimited"
            ? null
            : formData.quantity.replace(regex, ""),
        id: data.id,
      });
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Saved Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <div>
      <Grid columns="repeat(auto-fit,minmax(350px,1fr))" gap="1rem">
        <FormProvider {...methods}>
          <ProductNameAndDescription />

          <ProductCategories />
        </FormProvider>
      </Grid>
      <Flex justify="center" margin="1rem 0 0 0">
        <Button
          color="green"
          isLoading={isLoading}
          disabled={isLoading}
          withTransition
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </Flex>
    </div>
  );
};

export default ProductGeneralInformation;
