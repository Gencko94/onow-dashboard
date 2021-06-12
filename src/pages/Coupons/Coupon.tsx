import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Flex from "../../components/StyledComponents/Flex";
import { COUPON } from "../../interfaces/coupons/coupons";
import Loading from "../../utils/Loading";
import { getSingleCoupon } from "../../utils/test-queries";

const Coupon = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(["coupon", id], () => getSingleCoupon(id), {
    suspense: true,
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<COUPON>({
    defaultValues: { ...data },
  });

  const onSubmit = (data: COUPON) => {
    console.log(data);
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              Something went wrong , please try again
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<Loading />}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Breadcrumbs
                childLabel="Coupon"
                parentLabel="Coupons"
                parentTarget="/coupons"
              />
              <Flex justify="flex-end">
                <Button
                  withTransition
                  text="Save Changes"
                  type="submit"
                  padding="0.5rem"
                  bg="green"
                />
              </Flex>
              <CouponInfo
                errors={errors}
                register={register}
                control={control}
              />
              <CouponProducts
                errors={errors}
                register={register}
                control={control}
              />
            </form>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Coupon;
