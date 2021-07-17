import { Controller, useFormContext } from "react-hook-form";
import { PRODUCT_OPTION } from "../../../interfaces/products/products";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Heading from "../../StyledComponents/Heading";
import OptionsList from "./ProductOptions/OptionsList";
import { FORM_PROPS } from "./ProductPricingAndOptions";

interface ProductOptionsProps {
  options: PRODUCT_OPTION[];
}

const ProductOptions = ({ options }: ProductOptionsProps) => {
  const { control, watch } = useFormContext<FORM_PROPS>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const optionsEnabled = watch("options_enabled");
  return (
    <div>
      <Heading color="primary" tag="h5" mb="1.5rem" weight="semibold">
        Product Options
      </Heading>
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

      {optionsEnabled && <OptionsList productOptions={options} />}
    </div>
  );
};

export default ProductOptions;
