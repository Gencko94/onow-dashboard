import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import DateIconedInput from "../../../reusable/DateIconedInput";
import IconedInput from "../../../reusable/IconedInput";
import Select from "../../../reusable/Select";

interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}
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
const BranchInformation = ({ control, errors, register }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
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

        <IconedInput
          Icon={IoMdCash}
          errors={errors?.cod_cost}
          register={register}
          required
          requiredMessage="Required"
          label="Cash on Delivery cost"
          name="cod_cost"
          number
          min={0}
        />

        <CheckToggle
          control={control}
          label="Enable Cash on Delivery"
          name="cod_enabled"
          desc="Enable Cash on Delivery at this branch"
        />
      </div>
    </Container>
  );
};

export default BranchInformation;

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
