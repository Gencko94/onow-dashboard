import { useForm } from "react-hook-form";
import BrandInfo from "../../components/Brands/Brand/BrandInfo";

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
      {/* <Breadcrumbs
       children={[{}]}
      /> */}
      <BrandInfo
        setValue={setValue}
        control={control}
        errors={errors}
        register={register}
      />
    </div>
  );
};

export default Brand;
