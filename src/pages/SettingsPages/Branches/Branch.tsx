import { FormProvider, useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import HeaderContainer from "../../../components/reusable/HeaderContainer";
import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";
import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import Flex from "../../../components/StyledComponents/Flex";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import extractError from "../../../utils/extractError";
import { deleteBranch, editBranch, getBranch } from "../../../utils/queries";

const Branch = () => {
  const queryClient = useQueryClient();
  const { handleCloseToast, setToastStatus } = useToast();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { id } = useParams<{ id: string }>();
  const { replace } = useHistory();
  const { data } = useQuery(["branch", id], () => getBranch(id), {
    suspense: true,
  });
  const { mutateAsync: editMutation, isLoading: editLoading } = useMutation(
    editBranch,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["coupon", id], (prev) => {
          return data;
        });
        replace("/coupons");
      },
    }
  );
  const methods = useForm<BRANCH>({
    defaultValues: data,
  });

  // Delete Mutation

  const {
    mutateAsync: deleteMutation,
    reset: resetDeleteMutation,
    isLoading: deleteLoading,
  } = useMutation(deleteBranch);
  const onSubmit = async (data: BRANCH) => {
    console.log({
      ...data,
    });
    try {
      // await editMutation({
      //   ...data,
      //   name: data.name,
      //   code: data.code,
      //   special_products: data.special_products.map((i: any) => i.id),
      //   special_categories: data.special_categories,
      //   couponCoverage: data.couponCoverage,
      //   max_discount: data.max_discount,
      //   min_total_order: data.min_total_order,
      //   id: data.id,
      // });
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Branch Changes saved Successfully",
        type: "success",
      });
      replace("/settings/branches");
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
  const handleDeleteBranch = async () => {
    try {
      await deleteMutation(id);
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Branch Deleted Successfully",
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
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Branch"
          parentLabel="Branches"
          parentTarget="/settings/branches"
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
            text="Delete Branch"
            padding="0.5rem"
            bg="danger"
            withRipple
            Icon={RiDeleteBinLine}
            iconSize={20}
            onClick={() =>
              setConfirmationModalStatus?.({
                open: true,
                closeCb: handleCloseConfirmationModal!,
                desc: "Are you sure you want to delete this branch ?",
                title: "Delete Branch",
                successCb: handleDeleteBranch,
              })
            }
          />
        </Flex>
      </HeaderContainer>
      <FormProvider {...methods}>
        <BranchInformation />
        <BranchLocation />
        <BranchWorkingHours />
      </FormProvider>
    </form>
  );
};

export default Branch;
