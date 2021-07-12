import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Grid from "../../components/StyledComponents/Grid";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useToast from "../../hooks/useToast";
import { CATEGORY } from "../../interfaces/categories/categories";
import extractError from "../../utils/extractError";
import { deleteCategory, editCategory, getCategory } from "../../utils/queries";
import CategoryImage from "./CategoryImage";

const Category = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { handleCloseToast, setToastStatus } = useToast();
  const { id } = useParams<{ id: string }>();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { data } = useQuery(["category", id], () => getCategory(id), {
    suspense: true,
  });
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CATEGORY>({ defaultValues: data });
  // Edit Mutation
  const {
    mutateAsync: editMutation,
    reset: resetEdit,
    isLoading: editLoading,
  } = useMutation(editCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  // Delete Mutation
  const {
    mutateAsync: deleteMutation,
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
      await deleteMutation(id.toString());
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Deleted Successfully",
        type: "success",
      });
      history.replace("/categories");
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        console.log(responseError);
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
  // Edit Mutation execution
  const onSubmit: SubmitHandler<CATEGORY> = async (data) => {
    try {
      await editMutation({
        id: data.id,
        active: data.active ? 1 : 0,
        name: data.name,
        parent_id: data.parent_id,
        slug: data.slug,
        description: data.description,
      });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Edited Successfully",
        type: "success",
      });
      history.replace("/categories");
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        console.log(responseError);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Category"
          parentLabel="Categories"
          parentTarget="/categories"
        />

        <Grid cols="auto auto" gap="0.5rem">
          <Button
            text="Save Changes"
            bg="green"
            padding="0.5rem"
            withRipple
            withTransition
            type="submit"
            isLoading={editLoading}
            disabled={editLoading}
          />
          <Button
            text="Delete"
            bg="danger"
            padding="0.5rem"
            withRipple
            isLoading={deleteLoading}
            disabled={deleteLoading}
            withTransition
            onClick={() => {
              setConfirmationModalStatus?.({
                open: true,
                title: "Delete Category",
                desc: "Are you sure you want to delete this category?",
                successCb: () => {
                  handleDeleteCategory(data!.id);
                },
                closeCb: handleCloseConfirmationModal!,
              });
            }}
          />
        </Grid>
      </HeaderContainer>
      <CategoryInfo
        watch={watch}
        control={control}
        errors={errors}
        register={register}
      />
      <CategoryImage
        control={control}
        errors={errors}
        setValue={setValue}
        id={data!.id}
      />
    </form>
  );
};

export default Category;
