import { useMutation, useQueryClient } from "react-query";
import extractError from "../../../utils/extractError";
import { deleteCategory } from "../../../utils/queries/categoriesQueries";
import useConfirmationModal from "../../useConfirmationModal/useConfirmationModal";
import useToast from "../../useToast";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync, reset, isSuccess } = useMutation(deleteCategory, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("categories");
    },
  });
  const handleDeleteCategory = async (id: number) => {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(id.toString());
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Deleted Successfully",
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
  return { handleDeleteCategory, isSuccess };
};
