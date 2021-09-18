import { useMutation, useQueryClient } from "react-query";
import extractError from "../../../utils/extractError";
import { activateProduct } from "../../../utils/queries/productQueries";
import useConfirmationModal from "../../useConfirmationModal/useConfirmationModal";
import useToast from "../../useToast";

export const useActivateProduct = () => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync, reset } = useMutation(activateProduct, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  const handleActivateProduct = async (id: number, active: number) => {
    try {
      await mutateAsync({ id, active });
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Status Changed",
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
  return {
    handleActivateProduct,
  };
};
