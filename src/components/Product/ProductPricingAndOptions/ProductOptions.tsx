import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { PRODUCT_OPTION } from "../../../interfaces/products/products";
import { up } from "../../../utils/themes";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Heading from "../../StyledComponents/Heading";
import OptionsList from "./ProductOptions/OptionsList";
import { FORM_PROPS } from "./ProductPricingAndOptions";

interface ProductOptionsProps {
  options: PRODUCT_OPTION[];
  productId: number;
}

const ProductOptions = ({ options, productId }: ProductOptionsProps) => {
  const { control, watch } = useFormContext<FORM_PROPS>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const optionsEnabled = watch("options_enabled");
  return (
    <>
      <Container>
        <div className="head">
          <Heading color="heading" tag="h5" weight="bold">
            Product Options
          </Heading>
        </div>
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
      </Container>
      {optionsEnabled && (
        <OptionsList productId={productId} productOptions={options} />
      )}
    </>
  );
};

export default ProductOptions;
const Container = styled.div(
  ({ theme: { breakpoints, border, accent1 } }) => `
  border: ${border};
  border-radius: 6px;
  margin:1rem 0 2rem 0;
  background-color:${accent1};
  
  .head {
    border-bottom: ${border};
    padding:0.5rem;
    
  }
  .content {
    padding:0.5rem;
  }
  ${up(breakpoints.md)} {
    .head , .content  {
      padding:1rem;
    }
  }
  `
);
