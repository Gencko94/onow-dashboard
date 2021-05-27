import { useForm } from "react-hook-form";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import CategoryProducts from "../../components/Categories/Category/CategoryProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_CATEGORY } from "../../interfaces/categories/categories";

const CreateNewCategory = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<NEW_CATEGORY>();
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Category"
        parentLabel="Categories"
        parentTarget="/categories"
      />
      <CategoryInfo
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      />
      {/* <CategoryProducts
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      /> */}
    </div>
  );
};

export default CreateNewCategory;
