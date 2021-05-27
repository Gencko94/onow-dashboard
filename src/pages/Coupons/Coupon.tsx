import { useForm } from "react-hook-form";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { COUPON } from "../../interfaces/coupons/coupons";

const Coupon = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<COUPON>();
  const onSubmit = (data: COUPON) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Coupon"
        parentLabel="Coupons"
        parentTarget="/coupons"
      />
      <CouponInfo errors={errors} register={register} control={control} />
      <CouponProducts errors={errors} register={register} control={control} />
      <button>Submit</button>
    </div>
  );
};

export default Coupon;
