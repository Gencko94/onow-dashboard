import { Controller, useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";
import styled from "styled-components";

import CheckToggle from "../../reusable/CheckToggle";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import Select from "../../reusable/Select";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
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
        <Heading tag="h5" mb="0.5rem" color="primary">
          Product Ordering Options
        </Heading>
      </div>

      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem">
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
        <Controller
          control={control}
          name="prep_time.unit"
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
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="2rem">
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
        <Controller
          control={control}
          name="active"
          render={({ field: { value, onChange } }) => {
            return (
              <CheckToggle
                label="Show Product in store"
                checked={value === 1 ? true : false}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange(1);
                  } else {
                    onChange(0);
                  }
                }}
              />
            );
          }}
        />
      </Grid>
    </Container>
  );
};

export default CreateProductOrdering;
const Container = styled.div`
  .title-container {
    padding: 1rem 0;
  }
`;
