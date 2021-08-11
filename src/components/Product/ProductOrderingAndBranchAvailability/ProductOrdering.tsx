import { Controller, useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";
import styled from "styled-components";

import CheckToggle from "../../reusable/CheckToggle";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import Grid from "../../StyledComponents/Grid";
import { FORM_PROPS } from "./ProductOrderingAndBranchAvailability";

const ProductOrdering = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const allowSideNotes = watch("allow_side_notes");
  const allowattach = watch("allow_attachments");
  console.log(allowattach);
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
          label="Preperation Time in Minutes"
          Icon={GrServices}
          errors={errors.prep_time}
          min={0}
          name="prep_time"
          register={register}
        />
      </Grid>
      <Grid cols="1fr 1fr" gap="3.5rem">
        <Controller
          control={control}
          name="allow_side_notes"
          render={({ field: { value, onChange } }) => {
            return (
              <CheckToggle
                label="Enable Customers to write extra Instructions"
                checked={value}
                onChange={onChange}
              />
            );
          }}
        />

        {allowSideNotes && (
          <Controller
            control={control}
            name="allow_attachments"
            render={({ field: { value, onChange } }) => {
              return (
                <CheckToggle
                  label="Enable Customers to upload attachments"
                  checked={value}
                  onChange={onChange}
                />
              );
            }}
          />
        )}
      </Grid>
    </Container>
  );
};

export default ProductOrdering;
const Container = styled.div`
  .title-container {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.primary};
  }
`;
