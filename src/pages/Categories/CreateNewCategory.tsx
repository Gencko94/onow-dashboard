import { SubmitHandler, useForm } from "react-hook-form";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Flex from "../../components/StyledComponents/Flex";
import { NEW_CATEGORY } from "../../interfaces/categories/categories";

export interface NEW_CATEGORY_FORM {
  id: number;
  name: {
    [key: string]: string;
  };
  slug: string;
  parent_id: number;
  image: File;
  active: 0 | 1;
  seo_description: string;
  as_child: boolean;
}

const CreateNewCategory = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<NEW_CATEGORY_FORM>();
  const onSubmit: SubmitHandler<NEW_CATEGORY_FORM> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Category"
        parentLabel="Categories"
        parentTarget="/categories"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="flex-end">
          <Button
            type="submit"
            text="Create new category"
            bg="green"
            padding="0.5rem"
            textSize="0.9rem"
            withRipple
            withTransition
          />
        </Flex>
        <CategoryInfo
          setValue={setValue}
          control={control}
          errors={errors}
          register={register}
        />
      </form>
    </div>
  );
};

export default CreateNewCategory;
