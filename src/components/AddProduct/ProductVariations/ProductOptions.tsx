import { useFormContext } from "react-hook-form";

import styled from "styled-components";
import { NEW_PRODUCT_FORM_PROPS } from "../../../interfaces/products/create-new-product";

import GithubInput from "../../reusable/Inputs/GithubInput";

import Options from "./Options/Options";

const ProductOptions = () => {
  const { control, watch } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const variationsEnabled = watch("variations_enabled");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Variations</h5>
      </div>
      <GithubInput
        control={control}
        label="Enable Variations"
        name="variations_enabled"
        desc="Variations are product options"
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
