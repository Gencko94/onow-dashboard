import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Flex from "../../components/StyledComponents/Flex";
import Hr from "../../components/StyledComponents/Hr";
import useToast from "../../hooks/useToast";
import { CATEGORY } from "../../interfaces/categories/categories";
import extractError from "../../utils/extractError";
import { createCategory } from "../../utils/queries";
import CategoryImage from "./CategoryImage";

export interface NEW_CATEGORY_FORM {
  name: {
    [key: string]: string;
  };
  slug: string;
  parent_category: CATEGORY;
  image: File[];
  active: 0 | 1;
  description: {
    [key: string]: string;
  };
}

const CreateNewCategory = () => {
  const history = useHistory();
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<NEW_CATEGORY_FORM>();
  const { mutateAsync: createCategoryMutation, isLoading } =
    useMutation(createCategory);
  const onSubmit: SubmitHandler<NEW_CATEGORY_FORM> = async (data) => {
    console.log(data);
    try {
      await createCategoryMutation({
        active: 1,
        image: data.image[0],
        description: data.description,
        name: data.name,
        parent_id: data.parent_category?.id,
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
        console.log(responseError);
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
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Create New Category"
          parentLabel="Categories"
          parentTarget="/categories"
        />
        <Flex justify="flex-end">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            text="Submit Data"
            Icon={BiPlus}
            bg="green"
            padding="0.5rem"
            textSize="0.9rem"
            withRipple
            withTransition
          />
        </Flex>
      </HeaderContainer>
      <CategoryInfo
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
