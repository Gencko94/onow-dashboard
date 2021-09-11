import { useMutation, useQueryClient } from "react-query";
import extractError from "../../../utils/extractError";
import { deleteMultipleProducts } from "../../../utils/queries";
import useConfirmationModal from "../../useConfirmationModal";
import useToast from "../../useToast";

interface IProps {
  successCallback?: () => void;
}

export const useDeleteMultipleProducts = ({ successCallback }: IProps) => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    mutateAsync,
    reset,
    isLoading: multipleDeleteLoading,
  } = useMutation(deleteMultipleProducts, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  const handleDeleteMultipleProducts = async (ids: number[]) => {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Products Deleted Successfully",
        type: "success",
      });
      successCallback?.();
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
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
  return { handleDeleteMultipleProducts, multipleDeleteLoading };
};
