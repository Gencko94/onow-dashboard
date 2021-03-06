import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Box from "../../reusable/Box/Box";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Hr from "../../StyledComponents/Hr";
import { secondTabProps } from "./CreateProductPricingAndOptions";
import CreateProductOptionsList from "./OptionsList/CreateProductOptionsList";

const CreateProductOptions = () => {
  const { control, watch, setValue, clearErrors } =
    useFormContext<secondTabProps>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const optionsEnabled = watch("options_enabled");
  useEffect(() => {
    if (!optionsEnabled) {
      clearErrors("options");
    }
  }, [clearErrors, optionsEnabled]);
  return (
    <Box type="titled" boxTitle="Product Options">
      <Controller
        name="options_enabled"
        control={control}
        render={({ field: { onChange, value } }) => (
          <GithubInput
            checked={value}
            onChange={(e) => {
              if (priceFromVariationsEnabled) {
                return;
              } else {
                onChange(e.target.checked);
                if (!e.target.checked) {
                  setValue("options", []);
                }
              }
            }}
            label="Enable Product Options"
            desc="Product Options are properties of the product like Size-Color-..."
          />
        )}
      />

      {optionsEnabled && (
        <>
          <Hr />
          <CreateProductOptionsList
            priceFromVariationsEnabled={priceFromVariationsEnabled}
          />
        </>
      )}
    </Box>
  );
};

export default CreateProductOptions;
