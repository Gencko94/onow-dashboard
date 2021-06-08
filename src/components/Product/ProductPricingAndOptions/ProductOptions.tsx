import { Controller, useFormContext } from "react-hook-form";

import styled from "styled-components";
import { NEW_PRODUCT_FORM_PROPS } from "../../../interfaces/products/create-new-product";
import Options from "../../AddProduct/ProductVariations/Options/Options";

import GithubInput from "../../reusable/Inputs/GithubInput";

const ProductOptions = () => {
  const { control, watch } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const variationsEnabled = watch("variations_enabled");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Variations</h5>
      </div>
      <Controller
        name="variations_enabled"
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <GithubInput
            checked={value}
            onChange={onChange}
            label="Enable Variations"
            desc="Variations are product options"
          />
        )}
      />

      {variationsEnabled && (
        <Options priceFromVariationsEnabled={priceFromVariationsEnabled} />
      )}
    </Container>
  );
};

export default ProductOptions;
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
