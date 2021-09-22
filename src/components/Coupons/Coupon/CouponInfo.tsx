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

import DateInput from "../../reusable/Inputs/DateIconedInput";
import Input from "../../reusable/Input/Input";

import Select from "../../reusable/Select";
import { AiOutlineTag } from "react-icons/ai";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Grid from "../../StyledComponents/Grid";
import { parseISO } from "date-fns";

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
export default function CouponInfo({ control, errors, register }: IProps) {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Box type="titled" boxTitle="Coupon Information">
      <Grid gap="1rem" columns="repeat(auto-fit,minmax(300px,1fr))">
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Coupon Name English"
          {...register("name.en", { required: "required" })}
        />
        <Input
          startAdornment={<MdSubtitles />}
          errors={errors}
          label="Coupon Name Arabic"
          {...register("name.ar", { required: "required" })}
        />
      </Grid>
      <Grid gap="1rem" columns="repeat(auto-fit,minmax(300px,1fr))">
        <Input
          startAdornment={<BiBarcode />}
          errors={errors}
          label="Coupon Code"
          {...register("code", { required: "required" })}
        />
        <Input
          startAdornment={<IoMdCash />}
          errors={errors}
          label="Minimum order amount"
          type="number"
          min={0}
          desc="0 For no minimum amount"
          {...register("min_total_order", { required: "required" })}
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

        <Input
          startAdornment={<IoMdCash />}
          errors={errors}
          label="Discount Amount"
          type="number"
          min={0}
          {...register("amount", { required: "required" })}
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

        <Input
          startAdornment={<FiUser />}
          errors={errors}
          label="Uses Per Customer"
          type="number"
          desc="Leave Blank for unlimited"
          min={0}
          {...register("uses_per_user")}
        />

        <Input
          startAdornment={<FiUsers />}
          errors={errors}
          label="Total Uses"
          type="number"
          desc="Leave Blank for unlimited"
          min={0}
          {...register("total_uses")}
        />
        <Input
          startAdornment={<AiOutlineTag />}
          errors={errors}
          label="Max Discount"
          type="number"
          desc="Keep 0 For no max discount"
          min={0}
          {...register("max_discount", { required: "Required" })}
        />
        <Controller
          name="start_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DateInput
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
              <DateInput
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
