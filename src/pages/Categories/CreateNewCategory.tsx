import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Flex from "../../components/StyledComponents/Flex";
import Heading from "../../components/StyledComponents/Heading";
import useToast from "../../hooks/useToast";
import { CATEGORY } from "../../interfaces/categories/categories";
import extractError from "../../utils/extractError";
import { createCategory } from "../../utils/queries";
import CategoryImage from "./CategoryImage";

export type NEW_CATEGORY_FORM = {
  slug: string;
  name: {
    [key: string]: string;
  };
  parent_category: CATEGORY;
  image: File;
  active: boolean;
  description: {
    [key: string]: string;
  };
};

const CreateNewCategory = () => {
  const history = useHistory();
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    control,
    register,
    setValue,
    watch,
    setError,

    formState: { errors },
    handleSubmit,
  } = useForm<any>({ defaultValues: { active: true } });
  const { mutateAsync: createCategoryMutation, isLoading } =
    useMutation(createCategory);
  const onSubmit: SubmitHandler<NEW_CATEGORY_FORM> = async (data) => {
    console.log(data);
    try {
      await createCategoryMutation({
        active: data.active ? 1 : 0,
        image: data.image ?? null,
        description: data.description,
        name: data.name,
        parent_id: data.parent_category?.id ?? null,
        slug: data.slug,
      });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Category Created Successfully",
        type: "success",
      });
      history.replace("/categories");
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        if (responseError.slug?.includes("The slug has already been taken.")) {
          setError(
            "slug",
            {
              message: "Slug has already been taken, Please type another one",
            },
            { shouldFocus: true }
          );
        }
      } else {
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h2" type="large-title">
        Create New Category
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الفئات", en: "Categories" },
            target: "/categories",
          },
          {
            name: { ar: "اضافة فئة جديدة", en: "Create New Category" },
            target: "",
          },
        ]}
      />
      <Flex justify="flex-end">
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          color="green"
          withTransition
        >
          Submit
        </Button>
      </Flex>

      <CategoryInfo
        setValue={setValue}
        watch={watch}
        control={control}
        errors={errors}
        register={register}
      />

      <CategoryImage setValue={setValue} control={control} errors={errors} />
    </form>
  );
};

export default CreateNewCategory;
