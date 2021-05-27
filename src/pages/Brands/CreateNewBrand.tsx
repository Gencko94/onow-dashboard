import { useForm } from "react-hook-form";
import BrandInfo from "../../components/Brands/Brand/BrandInfo";

import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_CATEGORY } from "../../interfaces/categories/categories";

const CreateNewBrand = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<NEW_CATEGORY>();
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Brand"
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

export default CreateNewBrand;
