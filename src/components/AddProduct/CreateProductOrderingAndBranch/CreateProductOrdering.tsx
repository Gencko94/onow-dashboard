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

const CreateProductOrdering = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<thirdTabProps>();
  const allowSideNotes = watch("allow_side_notes");
  return (
    <div>
      <Heading tag="h5" margin="1rem 0" weight="semibold" color="primary">
        Product Ordering Options
      </Heading>

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
          label="Preperation Time in Minutes"
          Icon={GrServices}
          errors={errors.prep_time}
          min={0}
          name="prep_time"
          register={register}
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
                  if (value === 1) {
                    onChange(0);
                  } else {
                    onChange(1);
                  }
                }}
              />
            );
          }}
        />
      </Grid>
    </div>
  );
};

export default CreateProductOrdering;
