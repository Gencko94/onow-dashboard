import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import ConfirmationModal from "../../components/reusable/ConfirmationModal";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import useToast from "../../hooks/useToast";
import { CATEGORY } from "../../interfaces/categories/categories";
import extractError from "../../utils/extractError";
import { deleteCategory, getCategory } from "../../utils/queries";

const Category = () => {
  const [modalStatus, setModalStatus] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });
  const queryClient = useQueryClient();
  const { handleCloseToast, setToastStatus } = useToast();
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(["category", id], () => getCategory(id), {
    suspense: true,
  });
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<CATEGORY>({ defaultValues: data });
  // Delete Mutation
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  const handleDeleteCategory = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      setModalStatus({ id: null, open: false });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      setModalStatus({ id: null, open: false });
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
  return (
    <div>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Category"
          parentLabel="Categories"
          parentTarget="/categories"
        />
      </HeaderContainer>
      <CategoryInfo
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      />
      <ConfirmationModal
        isOpen={modalStatus.open}
        closeFunction={() => setModalStatus({ id: null, open: false })}
        desc="Are you sure you want to delete this Category ?"
        successButtonText="Delete"
        successFunction={() => handleDeleteCategory(modalStatus.id!)}
        title="Delete Product"
        isLoading={deleteLoading}
        styles={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />
    </div>
  );
};

export default Category;
