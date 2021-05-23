import { useForm } from "react-hook-form";
import styled from "styled-components";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_COUPON } from "../../interfaces/coupons/coupons";

const CreateNewCoupon = () => {
  const {
    formState: { errors },
    register,

    control,
  } = useForm<NEW_COUPON>({
    defaultValues: {
      covered_data: [],
    },
  });

  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Coupon"
        parentLabel="Coupons"
        parentTarget="/coupons"
      />
      <Container>
        <CouponInfo errors={errors} register={register} control={control} />
        <CouponProducts errors={errors} register={register} control={control} />
      </Container>
    </div>
  );
};

export default CreateNewCoupon;
const Container = styled.div``;
