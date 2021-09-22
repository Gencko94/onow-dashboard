import { Controller } from "react-hook-form";

import { IoMdCash } from "react-icons/io";
import { MdSmartphone, MdSubtitles } from "react-icons/md";

import Input from "../../../reusable/Input/Input";

import { AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import Grid from "../../../StyledComponents/Grid";
import { useFormContext } from "react-hook-form";

import GithubInput from "../../../reusable/Inputs/GithubInput";
import Box from "../../../reusable/Box/Box";

const BranchInformation = () => {
  const {
    formState: { errors },
    register,
    control,
    watch,
  } = useFormContext();

  const codEnabled = watch("cod_enabled");
  return (
    <Box type="titled" boxTitle="Branch information">
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Branch Name English"
          {...register("name.en", {
            required: "Required",
          })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Branch Name Arabic"
          {...register("name.ar", {
            required: "Required",
          })}
        />
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Input
          startAdornment={<MdSmartphone />}
          errors={errors}
          label="Mobile"
          {...register("contact_info.mobile", {
            required: "Required",
          })}
        />
        <Input
          startAdornment={<AiOutlinePhone />}
          errors={errors}
          label="Landline"
          {...register("contact_info.landline", {
            required: "Required",
          })}
        />
        <Input
          startAdornment={<AiOutlineWhatsApp />}
          errors={errors}
          label="Whatsapp"
          {...register("contact_info.whatsapp", {
            required: "Required",
          })}
        />
      </Grid>
      <Grid
        columns="repeat(auto-fit,minmax(300px,0.5fr))"
        gap="1rem"
        margin="1rem 0"
      >
        <Controller
          control={control}
          name="cod_enabled"
          render={({ field: { value, onChange } }) => {
            return (
              <GithubInput
                checked={value}
                label="Enable Cash on Delivery"
                onChange={onChange}
                desc="Enable Cash on Delivery at this branch"
              />
            );
          }}
        />
        {codEnabled && (
          <Input
            type="number"
            errors={errors}
            startAdornment={<IoMdCash />}
            label="Cash on Delivery cost"
            min={0}
            {...register("cod_cost", {
              required: "Required",
            })}
          />
        )}
      </Grid>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <Controller
          control={control}
          name="delivery_enabled"
          render={({ field: { value, onChange } }) => {
            return (
              <GithubInput
                checked={value}
                label="Accept Delivery orders"
                onChange={onChange}
                desc="Accept delivery orders from this branch"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="enable_pickup"
          render={({ field: { value, onChange } }) => {
            return (
              <GithubInput
                checked={value}
                label="Accept pick up orders"
                onChange={onChange}
                desc="Accept pickup orders from this branch"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="busy"
          render={({ field: { value, onChange } }) => {
            return (
              <GithubInput
                checked={value}
                label="Busy Branch"
                onChange={onChange}
                desc="Signals that the branch is busy and cannot accept orders"
              />
            );
          }}
        />
      </Grid>
    </Box>
  );
};

export default BranchInformation;
