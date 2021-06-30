import { Controller, useFormContext } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import styled from "styled-components";
import { secondTabProps } from "./CreateProductPricingAndOptions";

import GithubInput from "../../reusable/Inputs/GithubInput";
import PrefixedIconedInput from "../../reusable/Inputs/PrefixedIconedInput";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import { useContext } from "react";
import Heading from "../../StyledComponents/Heading";

const CreateProductPricing = () => {
  const {
    register,
    control,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<secondTabProps>();

  const { formValues } = useContext(NewProductContext);
  const priceByOptions = watch("price_by_options");
  return (
    <Container>
      <div className="title-container">
        <Heading color="primary" tag="h5" mb="1.5rem">
          Product Pricing
        </Heading>
      </div>
      <div className="inputs-container">
        <PrefixedIconedInput
          errors={errors.price}
          Icon={IoPricetagsOutline}
          name="price"
          register={register}
          label="Product Price"
          prefix="KD"
          disabled={priceByOptions ?? formValues?.price_by_options}
          required={!priceByOptions}
          requiredMessage="Required"
          defaultValue={formValues?.price}
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
                  setValue("variations_enabled", true);
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

export default CreateProductPricing;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor } }) => `
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
