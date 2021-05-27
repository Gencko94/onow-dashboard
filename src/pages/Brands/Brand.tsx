import { useForm } from "react-hook-form";
import BrandInfo from "../../components/Brands/Brand/BrandInfo";
import CategoryInfo from "../../components/Categories/Category/CategoryInfo";
import CategoryProducts from "../../components/Categories/Category/CategoryProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { CATEGORY } from "../../interfaces/categories/categories";

const Brand = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<CATEGORY>();
  return (
    <div>
      <Breadcrumbs
        childLabel="Brand"
        parentLabel="Brands"
        parentTarget="/brands"
      />
      <BrandInfo
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

export default Brand;
