import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import IconedInput from "../../reusable/Inputs/IconedInput";
import PrefixedInput from "../../reusable/Inputs/PrefixedInput";
import QuantityInput from "../../reusable/Inputs/QuantityInput";
import { firstTabInfo } from "./CreateProductGeneralInfo";

const CreateProductNameAndDescription = () => {
  const { formValues } = useContext(NewProductContext);
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<firstTabInfo>();
  const quantity = watch("quantity");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Naming & Description</h5>
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
          defaultValue={formValues?.name?.en}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Product Name Arabic"
          name="name.ar"
          defaultValue={formValues?.name?.ar}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.description?.en}
          register={register}
          required
          requiredMessage="Required"
          label="Short Description English"
          name="description.en"
          defaultValue={formValues?.description?.en}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.description?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Short Description Arabic"
          name="description.ar"
          defaultValue={formValues?.description?.ar}
        />
        <IconedInput
          Icon={BiDetail}
          errors={errors?.sku}
          register={register}
          required
          requiredMessage="Required"
          label="SKU"
          name="sku"
          defaultValue={formValues?.sku}
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

        <div style={{ gridColumn: "1/3" }}>
          <PrefixedInput
            errors={errors?.slug}
            label="Slug"
            name="slug"
            register={register}
            required
            defaultValue={formValues?.slug}
            requiredMessage="Required"
            prefixText="https://your-domain.com/products/"
            desc="This is how your product will look in the URL"
          />
        </div>
      </div>
    </Container>
  );
};

export default CreateProductNameAndDescription;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
 
  display:flex;
  flex-direction:column;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    flex:1;
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 1fr 1fr;
     

    }
  }
  
  `
);
