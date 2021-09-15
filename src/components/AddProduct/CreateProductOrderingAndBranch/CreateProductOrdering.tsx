import { Controller, useFormContext } from "react-hook-form";
import { GrServices } from "react-icons/gr";
import { RiHandCoinLine } from "react-icons/ri";

import CheckToggle from "../../reusable/CheckToggle";
import Input from "../../reusable/Input/Input";
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
      <Heading tag="h5" color="primary">
        Product Ordering Options
      </Heading>

      <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem">
        <Input
          label="Maximum ordering quantity per customer"
          startAdornment={<RiHandCoinLine />}
          errors={errors}
          min={0}
          type="number"
          desc="0 For Unlimited"
          {...register("max_qty_per_user")}
        />
        <Input
          type="number"
          label="Preperation Time in Minutes"
          startAdornment={<GrServices />}
          errors={errors}
          min={0}
          {...register("prep_time")}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="2rem">
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
