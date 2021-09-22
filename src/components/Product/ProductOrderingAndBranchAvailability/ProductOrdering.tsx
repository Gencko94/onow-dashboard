import { Controller, useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";
import Box from "../../reusable/Box/Box";

import CheckToggle from "../../reusable/CheckToggle";
import Input from "../../reusable/Input/Input";
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

  return (
    <Box type="titled" boxTitle="Product Ordering options">
      <Grid columns="1fr  1fr 0.2fr" gap="0.5rem">
        <Input
          label="Maximum ordering quantity per customer"
          startAdornment={<RiHandCoinLine />}
          errors={errors}
          type="number"
          min={0}
          desc="0 For Unlimited"
          {...register("max_qty_per_user", { required: "Required" })}
        />
        <Input
          label="Preperation Time in Minutes"
          startAdornment={<GrServices />}
          errors={errors}
          min={0}
          type="number"
          {...register("prep_time", { required: "Required" })}
        />
      </Grid>
      <Grid columns="1fr 1fr" gap="3.5rem">
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
    </Box>
  );
};

export default ProductOrdering;
