import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Spacer from "../../components/reusable/Spacer";

import Flex from "../../components/StyledComponents/Flex";
import Heading from "../../components/StyledComponents/Heading";
import useToast from "../../hooks/useToast";

import extractError from "../../utils/extractError";
import { createCoupon } from "../../utils/queries";

type NEW_COUPON_FORM = {
  name: {
    [key: string]: string;
  };
  start_date: string;
  end_date: string;
  code: string;
  discount_type: "fixed" | "percent";
  free_delivery: "0" | "1";
  amount: string;
  max_discount: string;
  min_total_order: string;
  total_uses: string | null;
  uses_per_user: string | null;
  enabled: boolean;
  coupon_coverage: number;
  special_products: number[];
  special_categories: number[];
};
const CreateNewCoupon = () => {
  const history = useHistory();
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
  } = useForm<NEW_COUPON_FORM>({
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
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      enabled: true,
    },
  });
  console.log(watch());

  const { mutateAsync, isLoading } = useMutation(createCoupon);
  const onSubmit: SubmitHandler<NEW_COUPON_FORM> = async (data) => {
    console.log(data);
    try {
      const regex = /^0+(?!$)/;
      await mutateAsync({
        ...data,
        total_uses: data.total_uses?.replace(regex, "") || null,
        uses_per_user: data.uses_per_user?.replace(regex, "") || null,
        max_discount: data.max_discount.replace(regex, ""),
        min_total_order: data.min_total_order.replace(regex, ""),
        special_products:
          data.coupon_coverage === 3 || data.coupon_coverage === 4
            ? data.special_products
            : [],
        special_categories:
          data.coupon_coverage === 2 ? data.special_categories : [],
      });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Coupon Created Successfully",
        type: "success",
      });
      history.replace("/coupons");
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        if (
          responseError?.code?.includes("The code has already been taken.") ||
          responseError?.code?.includes("code Already exist")
        ) {
          setError("code", {
            message: "Coupon Code has been Taken, Please Select Another one",
          });
        }
      } else {
        console.log(unknownError);
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
      <Flex justify="space-between" items="center" margin="1rem 0">
        <div>
          <Heading tag="h3">Create New Coupon</Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "الكوبونات", en: "Coupons" },
                target: "/coupons",
              },
              {
                name: { ar: "اضافة كوبون جديد", en: "Create New Coupon" },
                target: "",
              },
            ]}
          />
        </div>
        <Button
          isLoading={isLoading}
          color="green"
          type="submit"
          withTransition
        >
          Submit
        </Button>
      </Flex>

      <Spacer size={40} />
      <CouponInfo errors={errors} register={register} control={control} />
      <CouponProducts
        errors={errors}
        setValue={setValue}
        control={control}
        watch={watch}
      />
    </form>
  );
};

export default CreateNewCoupon;
