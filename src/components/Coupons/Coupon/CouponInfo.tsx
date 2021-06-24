import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BiBarcode } from "react-icons/bi";
import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import DateIconedInput from "../../reusable/Inputs/DateIconedInput";
import IconedInput from "../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import Select from "../../reusable/Select";
import { AiOutlineTag } from "react-icons/ai";
interface IProps {
  register: UseFormRegister<any>;
  errors: DeepMap<any, FieldError>;

  control: Control<any>;
}
const options = [
  {
    label: {
      ar: "نسبة",
      en: "Percent",
    },
    value: "percent",
  },
  {
    label: {
      ar: "مبلغ ثابت",
      en: "Fixed Amount",
    },
    value: "fixed",
  },
];
const freeDeliveryOptions = [
  {
    label: {
      ar: "لا",
      en: "No",
    },
    value: "0",
  },
  {
    label: {
      ar: "نعم",
      en: "Yes",
    },
    value: "1",
  },
];
export default function CouponInfo<T>({ control, errors, register }: IProps) {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="title-container">
        <h5>Coupon Information</h5>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name?.en}
          register={register}
          required
          requiredMessage="Required"
          label="Coupon Name English"
          name="name.en"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.name?.ar}
          register={register}
          required
          requiredMessage="Required"
          label="Coupon Name Arabic"
          name="name.ar"
        />
        <IconedInput
          Icon={BiBarcode}
          errors={errors?.code}
          register={register}
          required
          requiredMessage="Required"
          label="Coupon Code"
          name="code"
        />
        <IconedNumberInput
          Icon={IoMdCash}
          errors={errors?.min_total_order}
          register={register}
          required
          requiredMessage="Required"
          label="Minimum order amount"
          name="min_total_order"
          min={0}
          desc="0 For no minimum amount"
        />
        <Controller
          control={control}
          name="discount_type"
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                value={
                  options.find((i) => i.value === value) as {
                    value: string;
                    label: {
                      [key: string]: string;
                    };
                  }
                }
                label="Discount Type"
                onChange={(val) => onChange(val.value)}
                errors={errors?.discount_type}
                options={options}
                getOptionLabel={(option: any) => option.label[language]}
                getOptionValue={(option: any) => option.value}
              />
            );
          }}
        />

        <IconedNumberInput
          Icon={IoMdCash}
          errors={errors?.amount}
          register={register}
          required
          requiredMessage="Required"
          label="Discount Amount"
          name="amount"
          min={0}
        />
        <Controller
          control={control}
          name="free_delivery"
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                value={
                  freeDeliveryOptions.find((i) => i.value === value) as {
                    value: string;
                    label: {
                      [key: string]: string;
                    };
                  }
                }
                label="Free Delivery"
                onChange={(val) => onChange(val.value)}
                errors={errors?.free_delivery}
                options={freeDeliveryOptions}
                getOptionLabel={(option: any) => option.label[language]}
                getOptionValue={(option) => option.value}
              />
            );
          }}
        />

        <IconedNumberInput
          Icon={FiUser}
          errors={errors?.uses_per_user}
          register={register}
          required
          requiredMessage="Required"
          label="Uses Per Customer"
          name="uses_per_user"
          desc="Leave Blank for unlimited"
          min={0}
        />

        <IconedNumberInput
          Icon={FiUsers}
          errors={errors?.total_uses}
          register={register}
          label="Total Uses"
          name="total_uses"
          desc="Leave Blank for unlimited"
          min={0}
        />
        <IconedNumberInput
          Icon={AiOutlineTag}
          errors={errors?.max_discount}
          register={register}
          required
          requiredMessage="Required"
          label="Max Discount"
          name="max_discount"
          desc="Keep 0 For no max discount"
          min={0}
        />

        <DateIconedInput
          errors={errors?.start_date}
          required
          control={control}
          requiredMessage="Required"
          label="Coupon Start Date"
          name="start_date"
        />
        <DateIconedInput
          errors={errors?.end_date}
          required
          control={control}
          requiredMessage="Required"
          label="Coupon End Date"
          name="end_date"
        />
      </div>
    </Container>
  );
}

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 1rem 0;
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
