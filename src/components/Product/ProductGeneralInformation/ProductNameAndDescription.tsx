import { useFormContext } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";
import Box from "../../reusable/Box/Box";

import Input from "../../reusable/Input/Input";
import QuantityInput from "../../reusable/Inputs/QuantityInput";
import Grid from "../../StyledComponents/Grid";
import { FORM_PROPS } from "./ProductGeneralInformation";

const ProductNameAndDescription = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const quantity = watch("quantity");

  return (
    <Box type="titled" boxTitle="Product Naming & Description">
      <Grid columns="repeat(auto-fill,minmax(275px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Product Name"
          {...register("name.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Product Name Arabic"
          {...register("name.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Short Description English"
          {...register("description.en", { required: "Required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Short Description Arabic"
          {...register("description.ar", { required: "Required" })}
        />
        <Input
          startAdornment={<BiDetail />}
          errors={errors}
          label="SKU"
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
          startAdornment="https://your-domain.com/products/"
          desc="This is how your product will look in the URL"
          {...register("slug", { required: "Required" })}
        />
      </Grid>
    </Box>
  );
};

export default ProductNameAndDescription;
