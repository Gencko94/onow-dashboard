import { Controller, useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";
import styled from "styled-components";

import CheckToggle from "../../reusable/CheckToggle";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import Select from "../../reusable/Select";
import Grid from "../../StyledComponents/Grid";
import { thirdTabProps } from "./CreateProductOrderingAndBranchAvailability";

const unitsOptions = [
  { label: "Minutes", value: "m" },
  { label: "Hours", value: "h" },
];

const CreateProductOrdering = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<thirdTabProps>();
  const allowSideNotes = watch("allow_side_notes");
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
          // defaultValue={formValues?.max_qty_per_user}
        />
        <IconedNumberInput
          label="Preperation Time"
          Icon={GrServices}
          errors={errors.prep_time?.time}
          min={0}
          name="prep_time.time"
          register={register}
          // defaultValue={formValues?.max_qty_per_user}
        />
        <Controller
          control={control}
          name="prep_time.unit"
          // defaultValue={formValues?.prep_time?.unit}
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                value={
                  unitsOptions.find((i) => i.value === value) as {
                    value: string;
                    label: string;
                  }
                }
                options={unitsOptions}
                label="Unit"
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                errors={errors.prep_time?.unit}
                defaultValue="m"
                onChange={(val) => onChange(val.value)}
              />
            );
          }}
        />
      </Grid>
      <Grid cols="1fr 1fr" gap="3.5rem">
        <Controller
          control={control}
          name="allow_side_notes"
          // defaultValue={formValues?.allow_side_notes}
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
            // defaultValue={formValues?.allow_attachments}
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

export default CreateProductOrdering;
const Container = styled.div`
  .title-container {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.mainColor};
  }
`;
