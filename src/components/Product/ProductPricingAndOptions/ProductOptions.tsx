import { Controller, useFormContext } from "react-hook-form";

import { PRODUCT_OPTION } from "../../../interfaces/products/products";
import Box from "../../reusable/Box/Box";

import GithubInput from "../../reusable/Inputs/GithubInput";
import OptionsList from "./ProductOptions/OptionsList";
import { FORM_PROPS } from "./ProductPricingAndOptions";

interface ProductOptionsProps {
  options: PRODUCT_OPTION[];
  productId: number;
}

const ProductOptions = ({ options, productId }: ProductOptionsProps) => {
  const { control, watch } = useFormContext<FORM_PROPS>();

  const optionsEnabled = watch("options_enabled");
  return (
    <>
      <Box type="titled" boxTitle="Product Options">
        <div className="content">
          <Controller
            name="options_enabled"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <GithubInput
                checked={value}
                onChange={onChange}
                label="Enable Product Options"
                desc="Product Options are properties of the product like Size-Color-..."
              />
            )}
          />
        </div>
      </Box>
      {optionsEnabled && (
        <OptionsList productId={productId} productOptions={options} />
      )}
    </>
  );
};

export default ProductOptions;
