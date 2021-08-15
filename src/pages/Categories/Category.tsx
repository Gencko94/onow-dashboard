import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Spacer from "../../components/reusable/Spacer";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useToast from "../../hooks/useToast";
import {
  CATEGORY,
  EDIT_CATEGORY,
} from "../../interfaces/categories/categories";
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
  const onSubmit: SubmitHandler<EDIT_CATEGORY> = async (data) => {
    try {
      await editMutation({
        id: data.id,
        active: data.active,
        name: data.name,
        parent_id: data.parent_id!,
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
      <Grid
        gap="0.5rem"
        cols="repeat(auto-fit,minmax(300px,auto))"
        items="center"
      >
        <div>
          <Heading tag="h2" type="large-title">
            Category
          </Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "الفئات", en: "Categories" },
                target: "/categories",
              },
              {
                name: { ar: "الفئة", en: "Category" },
                target: "",
              },
            ]}
          />
        </div>
        <Grid cols=" auto auto" gap="1rem" items="center" justify="end">
          <Button
            color="green"
            withTransition
            type="submit"
            isLoading={editLoading}
            disabled={editLoading}
          >
            Save changes
          </Button>
          <Button
            color="danger"
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
          >
            Delete Category
          </Button>
        </Grid>
      </Grid>
      <Spacer size={40} />
      <CategoryInfo
        watch={watch}
        control={control}
        errors={errors}
        register={register}
      />
      <Spacer size={30} />
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
