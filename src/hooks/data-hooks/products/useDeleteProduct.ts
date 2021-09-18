import { useMutation, useQueryClient } from "react-query";
import extractError from "../../../utils/extractError";
import { deleteProduct } from "../../../utils/queries/productQueries";
import useConfirmationModal from "../../useConfirmationModal/useConfirmationModal";
import useToast from "../../useToast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync, reset, isSuccess } = useMutation(deleteProduct, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  async function handleDeleteProduct(id: number) {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(id);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Deleted Successfully",
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
  }

  return { handleDeleteProduct, isSuccess };
};
