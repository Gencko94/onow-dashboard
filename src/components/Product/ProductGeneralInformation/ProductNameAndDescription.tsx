import { useFormContext } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";

import IconedInput from "../../reusable/Inputs/IconedInput";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import QuantityInput from "../../reusable/Inputs/QuantityInput";
import Heading from "../../StyledComponents/Heading";
import { FORM_PROPS } from "./ProductGeneralInformation";

const ProductNameAndDescription = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const quantity = watch("quantity");

  return (
    <Container>
      <div className="title-container">
        <Heading color="primary" tag="h5">
          Product Naming & Description
        </Heading>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name?.en}
          register={register}
          required
          requiredMessage="Required"
          label="Product Name"
          name="name.en"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Product Name Arabic"
          name="name.ar"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.description?.en}
          register={register}
          required
          requiredMessage="Required"
          label="Short Description English"
          name="description.en"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.description?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Short Description Arabic"
          name="description.ar"
        />
        <IconedInput
          Icon={BiDetail}
          errors={errors?.sku}
          register={register}
          required
          requiredMessage="Required"
          label="SKU"
          name="sku"
        />

        <QuantityInput
          unlimited={quantity === "unlimited"}
          control={control}
          errors={errors?.quantity}
          required
          requiredMessage="Required"
          label="Quantity"
          name="quantity"
        />
        <div className="slug">
          <PrefixedInput
            errors={errors?.slug}
            label="Slug"
            name="slug"
            register={register}
            required
            requiredMessage="Required"
            prefixText="https://your-domain.com/products/"
            desc="This is how your product will look in the URL"
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductNameAndDescription;
const Container = styled.div(
  ({ theme: { breakpoints, border, bodyColor } }) => `
  margin: 1rem 0;
  display:flex;
  flex-direction:column;
  .title-container {
    padding: 1rem 0;
    
  }
  .box {
    flex:1;
    background-color:${bodyColor} ;
    border: ${border};
    border-radius: 6px;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
    gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      padding: 1rem;
      
      
      .slug {
        grid-column:span 2;
      }

    }
  }
  
  `
);
