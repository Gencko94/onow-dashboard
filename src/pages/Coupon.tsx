import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import CouponInfo from "../components/Coupons/Coupon/CouponInfo";
import { COUPON } from "../interfaces/coupons/coupons";

const Coupon = () => {
  const methods = useForm<COUPON>();
  return (
    <div>
      <FormProvider {...methods}>
        <CouponInfo />
      </FormProvider>
    </div>
  );
};

export default Coupon;
