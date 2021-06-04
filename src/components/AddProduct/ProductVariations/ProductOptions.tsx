import { useFormContext } from "react-hook-form";

import styled from "styled-components";
import { NEW_PRODUCT } from "../../../interfaces/products/products";
import GithubInput from "../../reusable/Inputs/GithubInput";

import Options from "./Options/Options";

const ProductOptions = () => {
  const { control, watch } = useFormContext<NEW_PRODUCT>();
  const priceFromVariationsEnabled = watch("priceFromVariations");
  const variationsEnabled = watch("productVariationsEnabled");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Variations</h5>
      </div>
      <GithubInput
        control={control}
        label="Enable Variations"
        name="productVariationsEnabled"
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
