import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../../reusable/IconedNumberInput";

import { useFormContext } from "react-hook-form";
import { firstBranchTabInfo } from "./NewBranchInfoAndLocation";

const options = [
  {
    title: {
      ar: "نسبة",
      en: "Percent",
    },
    value: "percent",
  },
  {
    title: {
      ar: "مبلغ ثابت",
      en: "Fixed Amount",
    },
    value: "fixed",
  },
];

const NewBranchInformation = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<firstBranchTabInfo>();
  return (
    <Container>
      <div className="title-container">
        <h5>Branch Information</h5>
      </div>
      <div className="box">
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
        <Controller
          control={control}
          name="cod_enabled"
          render={({ field: { value, onChange } }) => {
            return (
              <CheckToggle
                checked={value}
                label="Enable Cash on Delivery"
                onChange={onChange}
                desc="Enable Cash on Delivery at this branch"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="delivery_enabled"
          render={({ field: { value, onChange } }) => {
            return (
              <CheckToggle
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
              <CheckToggle
                checked={value}
                label="Accept pick up orders"
                onChange={onChange}
                desc="Accept pickup orders from this branch"
              />
            );
          }}
        />
      </div>
    </Container>
  );
};

export default NewBranchInformation;

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
