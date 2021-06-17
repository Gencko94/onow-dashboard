import { useForm } from "react-hook-form";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { CATEGORY } from "../../interfaces/categories/categories";

const Category = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<CATEGORY>();
  return (
    <div>
      <Breadcrumbs
        childLabel="Category"
        parentLabel="Categories"
        parentTarget="/categories"
      />
      <CategoryInfo
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      />
    </div>
  );
};

export default Category;
