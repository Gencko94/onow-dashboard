import { useFormContext } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import { NEW_PRODUCT } from "../../../interfaces/products/products";
import IconedInput from "../../reusable/IconedInput";

const ProductNameAndDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT>();
  return (
    <Container>
      <div className="title-container">
        <h5>Product Naming & Description</h5>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name}
          register={register}
          required
          requiredMessage="Required"
          label="Product Name"
          name="name"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name_ar}
          register={register}
          required
          requiredMessage="Required"
          label="Product Name Arabic"
          name="name_ar"
        />
      </div>
    </Container>
  );
};

export default ProductNameAndDescription;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
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
      grid-template-columns: 1fr 1fr 1fr;

    }
  }
  `
);
