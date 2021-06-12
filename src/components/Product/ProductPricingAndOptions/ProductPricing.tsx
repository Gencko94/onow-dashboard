import { Controller, useFormContext } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import styled from "styled-components";

import GithubInput from "../../reusable/Inputs/GithubInput";
import PrefixedIconedInput from "../../reusable/Inputs/PrefixedIconedInput";
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
    <Container>
      <div className="title-container">
        <h5>Product Pricing</h5>
      </div>
      <div className="inputs-container">
        {/* <PrefixedIconedInput
          errors={errors.price}
          Icon={IoPricetagsOutline}
          name="price"
          register={register}
          label="Product Price"
          prefix="KD"
          disabled={priceFromVariationsEnabled}
        /> */}
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
        {/* <Controller
          name="price_by_options"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <GithubInput
              onChange={(e) => {
                if (errors.price) {
                  clearErrors("price");
                  onChange(e.target.checked);
                }
              }}
              checked={value}
              label="Enable Pricing by variations"
              desc="Product Price will be dependent on the Variation Price."
              secondaryDesc="Enabling this option will enable product variations by default."
            />
          )}
        /> */}
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
      </div>
    </Container>
  );
};

export default ProductPricing;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor } }) => `
    .title-container {
        color: ${mainColor};
        margin-bottom:1rem;
    }
    .inputs-container {
        display: grid;
        grid-template-columns: 1fr;
        gap:1rem;
    }
    @media ${breakpoints.md}{
        .inputs-container {
           
            grid-template-columns: 1fr 1fr 1fr;
        }


    }
    `
);
