import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BiBarcode } from "react-icons/bi";
import { FiCalendar, FiUser, FiUsers } from "react-icons/fi";
import { IoMdCash } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import DateIconedInput from "../../reusable/DateIconedInput";
import IconedInput from "../../reusable/IconedInput";
import Select from "../../reusable/Select";
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
const CouponInfo = ({ control, errors, register }: IProps) => {
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
          errors={errors?.name}
          register={register}
          required
          requiredMessage="Required"
          label="Coupon Name"
          name="name"
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
        <IconedInput
          Icon={IoMdCash}
          errors={errors?.min_total_amount}
          register={register}
          required
          requiredMessage="Required"
          label="Minimum order amount"
          name="min_total_amount"
          number
          min={0}
        />

        <Select
          label="Discount Type"
          control={control}
          name="discount_type"
          errors={errors?.discount_type}
          options={options}
          defaultValue="fixed"
          getOptionLabel={(option) => option.title[language]}
          getOptionValue={(option) => option.value}
        />

        <IconedInput
          Icon={IoMdCash}
          errors={errors?.amount}
          register={register}
          required
          requiredMessage="Required"
          label="Discount Amount"
          name="amount"
          number
          min={0}
        />
        <Select
          label="Free Delivery"
          control={control}
          name="free_delivery"
          errors={errors?.free_delivery}
          options={[
            {
              title: {
                ar: "نعم",
                en: "Yes",
              },
              value: "1",
            },
            {
              title: {
                ar: "لا",
                en: "No",
              },
              value: "0",
            },
          ]}
          defaultValue="0"
          getOptionLabel={(option) => option.title[language]}
          getOptionValue={(option) => option.value}
        />
        <IconedInput
          Icon={FiUser}
          errors={errors?.uses_per_user}
          register={register}
          required
          requiredMessage="Required"
          label="Uses Per User"
          name="uses_per_user"
          desc="Leave Blank for unlimited"
          number
          min={0}
        />
        <IconedInput
          Icon={FiUsers}
          errors={errors?.total_uses}
          register={register}
          required
          requiredMessage="Required"
          label="Total Uses"
          name="total_uses"
          desc="Leave Blank for unlimited"
          number
          min={0}
        />
        <DateIconedInput
          Icon={FiCalendar}
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
};

export default CouponInfo;

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
