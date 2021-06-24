import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Flex from "../../components/StyledComponents/Flex";
import useToast from "../../hooks/useToast";
import { NEW_COUPON } from "../../interfaces/coupons/coupons";
import extractError from "../../utils/extractError";
import { createCoupon } from "../../utils/queries";

const CreateNewCoupon = () => {
  const history = useHistory();
  const { handleCloseToast, setToastStatus } = useToast();
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
      max_discount: "0",
      min_total_order: "0",
      total_uses: "10",
      uses_per_user: "1",
    },
  });
  const { mutateAsync, isLoading } = useMutation(createCoupon);
  const onSubmit: SubmitHandler<NEW_COUPON> = async (data) => {
    const regex = /^0+(?!$)/;
    console.log({
      ...data,
      total_uses: data.total_uses.replace(regex, ""),
      uses_per_user: data.uses_per_user.replace(regex, ""),
      max_discount: data.max_discount.replace(regex, ""),
      min_total_order: data.min_total_order.replace(regex, ""),
    });
    try {
      const regex = /^0+(?!$)/;
      await mutateAsync({
        ...data,
        total_uses: data.total_uses.replace(regex, ""),
        uses_per_user: data.uses_per_user.replace(regex, ""),
        max_discount: data.max_discount.replace(regex, ""),
        min_total_order: data.min_total_order.replace(regex, ""),
      });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Coupon Created Successfully",
        type: "success",
      });
      history.replace("/coupons");
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        console.log(responseError);
      } else {
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Create New Coupon"
          parentLabel="Coupons"
          parentTarget="/coupons"
        />
        <Flex justify="flex-end">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            text="Submit Data"
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
      </HeaderContainer>

      <CouponInfo errors={errors} register={register} control={control} />
      <CouponProducts errors={errors} register={register} control={control} />
    </form>
  );
};

export default CreateNewCoupon;
