import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  QueryErrorResetBoundary,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import ConfirmationModal from "../../components/reusable/ConfirmationModal";
import ErrorToast from "../../components/reusable/ErrorToast";
import Flex from "../../components/StyledComponents/Flex";
import { COUPON } from "../../interfaces/coupons/coupons";
import Loading from "../../utils/Loading";
import { deleteCoupon, editCoupon, getCoupon } from "../../utils/queries";

const Coupon = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { replace } = useHistory();
  const { data } = useQuery(["coupon", id], () => getCoupon(id), {
    suspense: true,
  });
  const { mutateAsync: editMutation } = useMutation(editCoupon, {
    onSuccess: (data) => {
      queryClient.setQueryData(["coupon", id], (prev) => {
        return data;
      });
      replace("/coupons");
    },
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<COUPON>({
    defaultValues: { ...data },
  });
  const [modalOpen, setModalOpen] = useState(false);
  // Delete Mutation

  const {
    mutateAsync: deleteMutation,
    reset: resetDeleteMutation,
    isError: deleteError,
  } = useMutation(deleteCoupon);
  const onSubmit = async (data: COUPON) => {
    console.log({
      ...data,
    });
    try {
      await editMutation({
        name_ar: data.name.ar,
        name_en: data.name.en,
        code: data.code,
        special_products: data.special_products.map((i: any) => i.id),
        special_categories: data.special_categories,
        coupon_coverage: data.couponCoverage,
        max_discount: data.max_discount,
        min_total_order: data.min_total_order,
        id: data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCoupon = async (id: number) => {
    // try {
    await deleteMutation(id.toString());
    // } catch (error) {
    // console.log(error);
    // }
  };
  console.log(data);
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
                  withRipple
                  margin="0 1rem"
                  textSize="0.9rem"
                />
                <Button
                  withTransition
                  textSize="0.9rem"
                  text="Delete Coupon"
                  padding="0.5rem"
                  bg="danger"
                  withRipple
                  Icon={RiDeleteBinLine}
                  iconSize={20}
                  onClick={() => setModalOpen(true)}
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
            <CSSTransition
              in={deleteError}
              classNames="error-toast"
              unmountOnExit
              timeout={200}
            >
              <ErrorToast
                text="Something Went Wrong"
                btnText="Close"
                closeFunction={resetDeleteMutation}
              />
            </CSSTransition>
            <ConfirmationModal
              isOpen={modalOpen}
              closeFunction={() => setModalOpen(false)}
              desc="Are you sure you want to delete this coupon ?"
              successButtonText="Delete"
              successFunction={() => handleDeleteCoupon(data!.id)}
              title="Delete Coupon"
              styles={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Coupon;
