import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import { editProductOrderingAndAvailability } from "../../../utils/queries/productQueries";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Hr from "../../StyledComponents/Hr";
import ProductBranches from "./ProductBranches";
import ProductOrdering from "./ProductOrdering";

interface IProps {
  data: PRODUCT;
}
export interface FORM_PROPS {
  max_qty_per_user: number;
  prep_time: number;
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
}
const ProductOrderingAndBranchAvailability = ({ data }: IProps) => {
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync, isLoading, reset } = useMutation(
    editProductOrderingAndAvailability
  );
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      allow_attachments: data.allow_attachments,
      allow_side_notes: data.allow_side_notes,
      branch_availability: {
        all: data.branch_availability.all,
        branches: data.branch_availability?.branches ?? [],
      },
      max_qty_per_user: data.max_qty_per_user,
      prep_time: data.prep_time,
    },
  });
  const onSubmit: SubmitHandler<FORM_PROPS> = async (formData) => {
    try {
      await mutateAsync({
        prep_time: formData.prep_time,
        allow_side_notes: formData.allow_side_notes,
        allow_attachments: formData.allow_attachments,
        branch_availability: {
          all: formData.branch_availability.all,
          branches: formData.branch_availability.all
            ? []
            : formData.branch_availability.branches,
        },
        id: data.id,
      });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Saved Successfully",
        type: "success",
      });
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something Went Wrong",
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
      <Flex justify="flex-end">
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
      <FormProvider {...methods}>
        <ProductOrdering />
        <Hr />
        <ProductBranches />
      </FormProvider>
    </div>
  );
};

export default ProductOrderingAndBranchAvailability;
