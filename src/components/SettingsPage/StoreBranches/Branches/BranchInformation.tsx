import {
  Control,
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import styled from "styled-components";
import CheckToggle from "../../../reusable/CheckToggle";
import DateIconedInput from "../../../reusable/Inputs/DateIconedInput";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import Select from "../../../reusable/Select";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { NewBranchContext } from "../../../../pages/SettingsPages/Branches/CreateNewBranch";
import { BRANCH_ADDRESS } from "../../../../interfaces/settings/branches-warehouses/branches-warehouses";
import { firstBranchTabInfo } from "../CreateNewBranch/NewBranchInfoAndLocation";

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
  const { updateData, setActiveTab, formValues } = useContext(NewBranchContext);
  const methods = useForm<firstBranchTabInfo>({
    defaultValues: {
      address: formValues?.address,
      contact_info: formValues?.contact_info,
      name: formValues?.name,
    },
  });
  const onSubmit: SubmitHandler<firstBranchTabInfo> = (data) => {
    console.log(data);

    setActiveTab?.(1);
    updateData?.(methods.watch());
  };
  const onError: SubmitErrorHandler<firstBranchTabInfo> = (errors) => {
    console.log(errors);
  };

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
