import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Create New Category"
          parentLabel="Categories"
          parentTarget="/categories"
        />
        <Flex justify="flex-end">
          <Button
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
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      />
    </form>
  );
};

export default CreateNewCategory;
