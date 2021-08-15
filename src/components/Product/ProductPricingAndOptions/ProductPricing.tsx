import { Controller, useFormContext } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import styled from "styled-components";
import { up } from "../../../utils/themes";
import Box from "../../reusable/Box/Box";

import GithubInput from "../../reusable/Inputs/GithubInput";
import PrefixedIconedInput from "../../reusable/Inputs/PrefixedIconedInput";
import Heading from "../../StyledComponents/Heading";
import { FORM_PROPS } from "./ProductPricingAndOptions";

const ProductPricing = () => {
  const {
    register,
    control,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const priceFromVariationsEnabled = watch("price_by_options");
  return (
    <Box type="titled" boxTitle="Product Pricing">
      <PrefixedIconedInput
        errors={errors.price}
        Icon={IoPricetagsOutline}
        name="price"
        register={register}
        label="Product Price"
        prefix="KD"
        disabled={priceFromVariationsEnabled}
        required={!priceFromVariationsEnabled}
        requiredMessage="Required"
        // defaultValue={formValues?.price}
      />

      <Controller
        name="price_by_options"
        control={control}
        render={({ field: { onChange, value } }) => (
          <GithubInput
            onChange={(e) => {
              if (e.target.checked) {
                if (errors.price) {
                  clearErrors("price");
                }
                setValue("options_enabled", true);
              }
              onChange(e.target.checked);
            }}
            checked={value}
            label="Enable Pricing by Product Options"
            desc="Product Price will be dependent on the Product Option Price."
            secondaryDesc="Enabling this option will enable product options by default."
          />
        )}
      />
    </Box>
  );
};

export default ProductPricing;
