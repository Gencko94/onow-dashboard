import { useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";
import styled from "styled-components";
import { NEW_PRODUCT } from "../../../interfaces/products/products";
import { NEW_PRODUCT_FORM_PROPS } from "../../../pages/Product/CreateNewProduct";

import CheckToggle from "../../reusable/CheckToggle";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import IconedInput from "../../reusable/Inputs/IconedInput";
import Select from "../../reusable/Select";
import Grid from "../../StyledComponents/Grid";

const unitsOptions = [
  { label: "Minutes", value: "m" },
  { label: "Hours", value: "h" },
];

const ProductOrdering = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  return (
    <Container>
      <div className="title-container">
        <h5>Product Ordering Options</h5>
      </div>

      <Grid cols="1fr  1fr 0.2fr" gap="0.5rem">
        <IconedNumberInput
          label="Maximum ordering quantity per customer"
          Icon={RiHandCoinLine}
          errors={errors.max_qty_per_user}
          name="max_qty_per_user"
          register={register}
          min={0}
          desc="0 For Unlimited"
        />
        <IconedNumberInput
          label="Preperation Time"
          Icon={GrServices}
          errors={errors.prep_time?.time}
          min={0}
          name="prep_time.time"
          register={register}
        />
        <Select
          options={unitsOptions}
          label="Unit"
          control={control}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          name="prep_time.unit"
          errors={errors.prep_time?.unit}
          defaultValue="m"
        />
      </Grid>

      <CheckToggle
        label="Enable Customers to write extra Instructions"
        control={control}
        name="allow_side_notes"
      />
    </Container>
  );
};

export default ProductOrdering;
const Container = styled.div`
  .title-container {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.mainColor};
  }
`;
