import { Controller, useFormContext } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import { secondTabProps } from "./CreateProductPricingAndOptions";

import GithubInput from "../../reusable/Inputs/GithubInput";
import { useContext } from "react";
import Input from "../../reusable/Input/Input";
import Box from "../../reusable/Box/Box";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";

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
    <Box type="titled" boxTitle="Product Pricing">
      <div className="inputs-container">
        <Input
          errors={errors}
          startAdornment={<IoPricetagsOutline />}
          label="Product Price"
          endAdornment="KD"
          disabled={priceByOptions ?? formValues?.price_by_options}
          defaultValue={formValues?.price}
          min={0}
          type="number"
          {...register("price", { required: priceByOptions && "Required" })}
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
      </div>
    </Box>
  );
};

export default CreateProductPricing;
