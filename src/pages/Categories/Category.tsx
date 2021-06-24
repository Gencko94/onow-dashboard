import { useForm } from "react-hook-form";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
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
    </div>
  );
};

export default Category;
