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
import {
  BRANCH_ADDRESS,
  BRANCH_INFO,
  WORKING_HOURS,
} from "../../../interfaces/settings/branches/branches";
import extractError from "../../../utils/extractError";
import { editBranch, getBranch } from "../../../utils/queries";
import {
  deleteBranch,
  updateBranchInfo,
  updateBranchLocation,
  updateBranchWorkingHours,
} from "../../../utils/queries/branchesQueries";

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

  // Info section
  const infoMethods = useForm<BRANCH_INFO>({
    defaultValues: {
      active: data?.active,
      busy: data?.busy,
      cod_cost: data?.cod_cost,
      cod_enabled: data?.cod_enabled,
      contact_info: data?.contact_info,
      delivery_enabled: data?.delivery_enabled,
      id: data?.id,
      name: data?.name,
      pickup_enabled: data?.pickup_enabled,
    },
  });
  const { mutateAsync: editBranchInfoMutation, isLoading: editInfoLoading } =
    useMutation(updateBranchInfo, {
      onSuccess: (data) => {
        // queryClient.setQueryData(["branch", id], (prev) => {
        //   return data;
        // });
        replace("/settings/branches");
      },
      onError: (error) => {
        const { responseError } = extractError(error);
        if (responseError) {
          console.log(responseError);
          setToastStatus?.({
            open: true,
            fn: handleCloseToast!,
            text: "Something went wrong",
            type: "error",
          });
        } else {
          setToastStatus?.({
            open: true,
            fn: handleCloseToast!,
            text: "Something went wrong",
            type: "error",
          });
        }
      },
    });
  // Edit Branch Info
  const handleEditBranchInfo = async (formData: BRANCH_INFO) => {
    console.log(formData);
    await editBranchInfoMutation(formData);
    setToastStatus?.({
      open: true,
      fn: handleCloseToast!,
      text: "Branch Changes saved Successfully",
      type: "success",
    });
    replace("/settings/branches");
  };

  //Location Section

  const locationMethods = useForm<BRANCH_ADDRESS>({
    defaultValues: data!.address,
  });
  const {
    mutateAsync: editBranchLocationMutation,
    isLoading: locationLoading,
  } = useMutation(updateBranchLocation, {
    onSuccess: (data) => {
      // queryClient.setQueryData(["branch", id], (prev) => {
      //   return data;
      // });
      replace("/settings/branches");
    },
    onError: (error) => {
      const { responseError } = extractError(error);
      if (responseError) {
        console.log(responseError);
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something went wrong",
          type: "error",
        });
      } else {
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something went wrong",
          type: "error",
        });
      }
    },
  });

  // Edit Branch Location
  const handleEditBranchLocation = async (formData: BRANCH_ADDRESS) => {
    console.log(formData);
    await editBranchLocationMutation({
      id: data!.id,
      address: { ...formData },
    });
    setToastStatus?.({
      open: true,
      fn: handleCloseToast!,
      text: "Branch Changes saved Successfully",
      type: "success",
    });
    replace("/settings/branches");
  };
  //Location Section

  const hoursMethods = useForm<WORKING_HOURS>({
    defaultValues: data!.working_hours,
  });
  const { mutateAsync: editBranchHoursMutation, isLoading: hoursLoading } =
    useMutation(updateBranchWorkingHours, {
      onSuccess: (data) => {
        // queryClient.setQueryData(["branch", id], (prev) => {
        //   return data;
        // });
        replace("/settings/branches");
      },
      onError: (error) => {
        const { responseError } = extractError(error);
        if (responseError) {
          console.log(responseError);
          setToastStatus?.({
            open: true,
            fn: handleCloseToast!,
            text: "Something went wrong",
            type: "error",
          });
        } else {
          setToastStatus?.({
            open: true,
            fn: handleCloseToast!,
            text: "Something went wrong",
            type: "error",
          });
        }
      },
    });

  // Edit Branch Location
  const handleEditBranchWorkingHours = async (formData: WORKING_HOURS) => {
    console.log(formData);
    await editBranchHoursMutation({
      id: data!.id,
      days: formData,
    });
    setToastStatus?.({
      open: true,
      fn: handleCloseToast!,
      text: "Branch Changes saved Successfully",
      type: "success",
    });
    replace("/settings/branches");
  };

  // Delete Logic

  const {
    mutateAsync: deleteMutation,
    reset: resetDeleteMutation,
    isLoading: deleteLoading,
  } = useMutation(deleteBranch);

  const handleDeleteBranch = async () => {
    try {
      handleCloseConfirmationModal?.();
      await deleteMutation(id);
      setToastStatus?.({
        open: true,
        fn: handleCloseToast!,
        text: "Branch Deleted Successfully",
        type: "success",
      });
      replace("/settings/branches");
    } catch (error) {
      handleCloseConfirmationModal?.();
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
    <div>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Branch"
          parentLabel="Branches"
          parentTarget="/settings/branches"
        />
        <Flex justify="flex-end">
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
      <form onSubmit={infoMethods.handleSubmit(handleEditBranchInfo)}>
        <FormProvider {...infoMethods}>
          <BranchInformation />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              text="Save Changes"
              type="submit"
              padding="0.5rem"
              bg="green"
              withRipple
              margin="0 1rem"
              textSize="0.9rem"
              isLoading={editInfoLoading}
              disabled={editInfoLoading}
            />
          </Flex>
        </FormProvider>
      </form>
      <form onSubmit={infoMethods.handleSubmit(handleEditBranchLocation)}>
        <FormProvider {...locationMethods}>
          <BranchLocation />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              text="Save Changes"
              type="submit"
              padding="0.5rem"
              bg="green"
              withRipple
              margin="0 1rem"
              textSize="0.9rem"
              isLoading={locationLoading}
              disabled={locationLoading}
            />
          </Flex>
        </FormProvider>
      </form>
      <form onSubmit={infoMethods.handleSubmit(handleEditBranchWorkingHours)}>
        <FormProvider {...hoursMethods}>
          <BranchWorkingHours />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              text="Save Changes"
              type="submit"
              padding="0.5rem"
              bg="green"
              withRipple
              margin="0 1rem"
              textSize="0.9rem"
              isLoading={hoursLoading}
              disabled={hoursLoading}
            />
          </Flex>
        </FormProvider>
      </form>
    </div>
  );
};

export default Branch;
