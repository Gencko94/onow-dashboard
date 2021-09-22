import { useMutation, useQueryClient } from "react-query";
import extractError from "../../../utils/extractError";
import { deleteMultipleCategories } from "../../../utils/queries/categoriesQueries";
import useConfirmationModal from "../../useConfirmationModal/useConfirmationModal";
import useToast from "../../useToast";

export const useDeleteMultipleCategories = () => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    mutateAsync,
    reset,
    isLoading: multipleDeleteLoading,
  } = useMutation(deleteMultipleCategories, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("categories");
    },
  });
  const handleDeleteMultipleCategories = async (ids: number[]) => {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Categories Deleted Successfully",
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
  return { handleDeleteMultipleCategories, multipleDeleteLoading };
};
