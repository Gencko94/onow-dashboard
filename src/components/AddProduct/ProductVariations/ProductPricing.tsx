import { useFormContext } from "react-hook-form";
import { IoPricetagsOutline } from "react-icons/io5";
import styled from "styled-components";
import { NEW_PRODUCT } from "../../../interfaces/products/products";
import DateIconedInput from "../../reusable/Inputs/DateIconedInput";
import GithubInput from "../../reusable/Inputs/GithubInput";
import PrefixedIconedInput from "../../reusable/Inputs/PrefixedIconedInput";

const ProductPricing = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT>();
  const priceFromVariationsEnabled = watch("priceFromVariations");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Pricing</h5>
      </div>
      <div className="inputs-container">
        <PrefixedIconedInput
          errors={errors.price}
          Icon={IoPricetagsOutline}
          name="price"
          register={register}
          label="Product Price"
          prefix="KD"
          disabled={priceFromVariationsEnabled}
        />
        <PrefixedIconedInput
          errors={errors.salePrice}
          Icon={IoPricetagsOutline}
          name="salePrice"
          register={register}
          label="Sale Price"
          prefix="KD"
          disabled={priceFromVariationsEnabled}
        />
        <DateIconedInput
          errors={errors.saleEndDate}
          name="saleEndDate"
          control={control}
          label="Sale End Date"
          disabled={priceFromVariationsEnabled}
        />
        <GithubInput
          control={control}
          label="Enable Pricing by variations"
          name="priceFromVariations"
          desc="Product Price will be dependent on the Variation Price."
          secondaryDesc="Enabling this option will enable product variations by default."
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
