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
import CouponInfo from "../../components/Coupons/Coupon/CouponInfo";
import CouponProducts from "../../components/Coupons/Coupon/CouponProducts";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import ConfirmationModal from "../../components/reusable/ConfirmationModal";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Flex from "../../components/StyledComponents/Flex";
import useToast from "../../hooks/useToast";
import { COUPON } from "../../interfaces/coupons/coupons";
import extractError from "../../utils/extractError";
import Loading from "../../utils/Loading";
import { deleteCoupon, editCoupon, getCoupon } from "../../utils/queries";

const Coupon = () => {
  const queryClient = useQueryClient();
  const { handleCloseToast, setToastStatus } = useToast();
  const { id } = useParams<{ id: string }>();
  const { replace } = useHistory();
  const { data } = useQuery(["coupon", id], () => getCoupon(id), {
    suspense: true,
  });
  const { mutateAsync: editMutation, isLoading: editLoading } = useMutation(
    editCoupon,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["coupon", id], (prev) => {
          return data;
        });
        replace("/coupons");
      },
    }
  );
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
    isLoading: deleteLoading,
  } = useMutation(deleteCoupon);
  const onSubmit = async (data: COUPON) => {
    console.log({
      ...data,
    });
    try {
      await editMutation({
        ...data,
        name: data.name,
        code: data.code,
        special_products: data.special_products.map((i: any) => i.id),
        special_categories: data.special_categories,
        couponCoverage: data.couponCoverage,
        max_discount: data.max_discount,
        min_total_order: data.min_total_order,
        id: data.id,
      });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Coupon Changes saved Successfully",
        type: "success",
      });
      replace("/coupons");
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
  const handleDeleteCoupon = async (id: number) => {
    try {
      await deleteMutation(id.toString());
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Coupon Deleted Successfully",
        type: "success",
      });
      replace("/coupons");
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
      } else if (unknownError) {
        console.log("here");
        setToastStatus?.({
          fn: () => {
            resetDeleteMutation();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
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
              <HeaderContainer>
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
                    isLoading={editLoading}
                    disabled={editLoading}
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
              </HeaderContainer>
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

            <ConfirmationModal
              isLoading={deleteLoading}
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
