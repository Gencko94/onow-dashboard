import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BiBarcode } from "react-icons/bi";
import { FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";

import DateIconedInput from "../../reusable/Inputs/DateIconedInput";
import IconedInput from "../../reusable/Inputs/IconedInput";
import IconedNumberInput from "../../reusable/IconedNumberInput";
import Select from "../../reusable/Select";
import { AiOutlineTag } from "react-icons/ai";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Grid from "../../StyledComponents/Grid";
import { format, parseISO } from "date-fns";

import Box from "../../reusable/Box/Box";
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
    <Box type="titled" boxTitle="Coupon Information">
      <Grid gap="1rem" columns="repeat(auto-fit,minmax(300px,1fr))">
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
      </Grid>
      <Grid gap="1rem" columns="repeat(auto-fit,minmax(300px,1fr))">
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
        <Controller
          name="start_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            console.log(parseISO("2021-09-16T21:00:00"), "initial value");
            console.log(parseISO("2021-09-16T21:00:00.000Z"), "initial value");
            return (
              <DateIconedInput
                errors={errors?.start_date}
                onChange={(date: Date) => onChange(date.toISOString())}
                selected={parseISO(value)}
                label="Coupon Start Date"
                ref={ref}
              />
            );
          }}
        />
        <Controller
          name="end_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DateIconedInput
                errors={errors?.end_date}
                label="Coupon End Date"
                onChange={(date: Date) => onChange(date.toISOString())}
                selected={parseISO(value)}
                ref={ref}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="enabled"
          render={({ field: { value, onChange } }) => {
            return (
              <GithubInput
                checked={value}
                onChange={(e) => {
                  if (value === true) {
                    onChange(false);
                  } else {
                    onChange(true);
                  }
                }}
                label="Enable Coupon"
              />
            );
          }}
        />
      </Grid>
    </Box>
  );
}
