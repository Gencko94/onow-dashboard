import { useEffect } from "react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";

import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import Box from "../../reusable/Box/Box";
import Input from "../../reusable/Input/Input";
import QuantityInput from "../../reusable/Inputs/QuantityInput";
import Grid from "../../StyledComponents/Grid";

import { firstTabInfo } from "./CreateProductGeneralInfo";

const CreateProductNameAndDescription = () => {
  const { formValues } = useContext(NewProductContext);
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<firstTabInfo>();
  const quantity = watch("quantity");
  const nameEn = watch("name.en");
  useEffect(() => {
    if (nameEn) {
      setValue?.("slug", nameEn.toLowerCase().split(" ").join("-"));
    }
  }, [nameEn]);
  return (
    <Box type="titled" boxTitle="Product Naming & Description">
      <Grid columns="repeat(auto-fill,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Product Name"
          defaultValue={formValues?.name?.en}
          {...register("name.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Product Name Arabic"
          defaultValue={formValues?.name?.ar}
          {...register("name.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Short Description English"
          defaultValue={formValues?.description?.en}
          {...register("description.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Short Description Arabic"
          defaultValue={formValues?.description?.ar}
          {...register("description.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<BiDetail />}
          errors={errors}
          label="SKU"
          defaultValue={formValues?.sku}
          {...register("sku", { required: "Required" })}
        />

        <QuantityInput
          unlimited={quantity === "unlimited"}
          control={control}
          errors={errors?.quantity}
          required
          requiredMessage="Required"
          label="Quantity"
          name="quantity"
        />
      </Grid>
      <Grid columns="1fr" gap="1rem">
        <Input
          errors={errors}
          label="Slug"
          defaultValue={formValues?.slug}
          startAdornment="https://your-domain.com/products/"
          desc="This is how your product will look in the URL"
          {...register("slug", { required: "Required" })}
        />
      </Grid>
    </Box>
  );
};

export default CreateProductNameAndDescription;
