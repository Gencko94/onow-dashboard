import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import styled from "styled-components";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Flex from "../../components/StyledComponents/Flex";
import { NEW_COUPON } from "../../interfaces/coupons/coupons";
import { createCoupon } from "../../utils/queries";

const CreateNewCoupon = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<NEW_COUPON>({
    defaultValues: {
      special_categories: [],
      special_products: [],
      coupon_coverage: 1,
      free_delivery: "0",
      discount_type: "fixed",
      max_discount: 0,
      min_total_order: 0,
    },
  });
  const { mutateAsync } = useMutation(createCoupon);
  const onSubmit: SubmitHandler<NEW_COUPON> = async (data) => {
    console.log(data);
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create New Coupon"
        parentLabel="Coupons"
        parentTarget="/coupons"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="flex-end">
          <Button
            text="Create New Coupon"
            bg="green"
            padding="0.5rem"
            shadow
            type="submit"
            textSize="0.9rem"
            Icon={BiPlus}
            iconSize={25}
            withRipple
            withTransition
          />
        </Flex>
        <CouponInfo errors={errors} register={register} control={control} />
        <CouponProducts errors={errors} register={register} control={control} />
      </form>
    </div>
  );
};

export default CreateNewCoupon;
