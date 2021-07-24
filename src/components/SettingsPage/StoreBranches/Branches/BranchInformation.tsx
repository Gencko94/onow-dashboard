import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IoMdCash } from "react-icons/io";
import { MdSmartphone, MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../../reusable/IconedNumberInput";

import { AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import Grid from "../../../StyledComponents/Grid";
import { useFormContext } from "react-hook-form";
import Heading from "../../../StyledComponents/Heading";
import GithubInput from "../../../reusable/Inputs/GithubInput";

const BranchInformation = () => {
  const {
    formState: { errors },
    register,
    control,
    watch,
  } = useFormContext();
  const {
    i18n: { language },
  } = useTranslation();
  const codEnabled = watch("cod_enabled");
  return (
    <Container>
      <Heading tag="h5" color="primary" margin="2rem 0" weight="semibold">
        Branch Information
      </Heading>

      <div className="box">
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.name?.en}
            register={register}
            required
            requiredMessage="Required"
            label="Branch Name English"
            name="name.en"
          />
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.name?.ar}
            register={register}
            required
            requiredMessage="Required"
            label="Branch Name Arabic"
            name="name.ar"
          />
        </Grid>
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
          <IconedInput
            Icon={MdSmartphone}
            errors={errors?.contact_info?.mobile}
            register={register}
            required
            requiredMessage="Required"
            label="Mobile"
            name="contact_info.mobile"
          />
          <IconedInput
            Icon={AiOutlinePhone}
            errors={errors?.contact_info?.landline}
            register={register}
            label="Landline"
            name="contact_info.landline"
          />
          <IconedInput
            Icon={AiOutlineWhatsApp}
            errors={errors?.contact_info?.whatsapp}
            register={register}
            label="Whatsapp"
            name="contact_info.whatsapp"
          />
        </Grid>
        <Grid
          cols="repeat(auto-fit,minmax(300px,0.5fr))"
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
            <IconedNumberInput
              Icon={IoMdCash}
              errors={errors?.cod_cost}
              register={register}
              required
              requiredMessage="Required"
              label="Cash on Delivery cost"
              name="cod_cost"
              min={0}
            />
          )}
        </Grid>
        <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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
            name="pickup_enabled"
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
      </div>
    </Container>
  );
};

export default BranchInformation;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, border, bodyColor } }) => `
 
  
  .box {
    background-color: ${bodyColor};
    border: ${border};
    border-radius: 6px;
    padding: 1rem;
  }
  @media ${breakpoints.md} {
   
  }
  `
);
