import { FormProvider, useForm } from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import Button from "../../../components/reusable/Button";
import Spacer from "../../../components/reusable/Spacer";

import BranchInformation from "../../../components/SettingsPage/StoreBranches/Branches/BranchInformation";
import BranchLocation from "../../../components/SettingsPage/StoreBranches/Branches/BranchLocation";
import BranchWorkingHours from "../../../components/SettingsPage/StoreBranches/Branches/BranchWorkingHours";
import Flex from "../../../components/StyledComponents/Flex";
import Heading from "../../../components/StyledComponents/Heading";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import {
  BRANCH_ADDRESS,
  BRANCH_INFO,
  WORKING_HOURS,
  WORKING_HOURS_ARRAY,
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

      name: data?.name,
      enable_pickup: data?.enable_pickup,
    },
  });
  const { mutateAsync: editBranchInfoMutation, isLoading: editInfoLoading } =
    useMutation(updateBranchInfo, {
      onSuccess: (data) => {
        queryClient.setQueryData(["branch", id], (prev) => {
          return data;
        });
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
    await editBranchInfoMutation({ info: formData, id: data!.id });
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
    defaultValues: {
      address: {
        address: data!.address.address,
        coords: {
          lat: parseFloat(data!.address.coords.lat),
          lng: parseFloat(data!.address.coords.lng),
        },
      } as any,
    },
  });
  const {
    mutateAsync: editBranchLocationMutation,
    isLoading: locationLoading,
  } = useMutation(updateBranchLocation, {
    onSuccess: (data) => {
      queryClient.setQueryData(["branch", id], (prev) => {
        return data;
      });
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
    await editBranchLocationMutation({
      id: data!.id,
      address: formData,
    });
    setToastStatus?.({
      open: true,
      fn: handleCloseToast!,
      text: "Branch Changes saved Successfully",
      type: "success",
    });
    replace("/settings/branches");
  };
  //Hours Section
  const convertArrayToObject = (hours: WORKING_HOURS_ARRAY): WORKING_HOURS => {
    let newHours: { [key: string]: any } = {};
    hours.forEach((day) => {
      newHours[Object.keys(day)[0]] = day[Object.keys(day)[0]];
    });
    console.log(newHours);
    return newHours as WORKING_HOURS;
  };

  const hoursMethods = useForm({
    defaultValues: { working_hours: convertArrayToObject(data!.working_hours) },
  });
  const { mutateAsync: editBranchHoursMutation, isLoading: hoursLoading } =
    useMutation(updateBranchWorkingHours, {
      onSuccess: (data) => {
        queryClient.setQueryData(["branch", id], (prev) => {
          return data;
        });
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
      <Flex items="center" justify="space-between">
        <div>
          <Heading tag="h2" type="large-title">
            Branch
          </Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "الإعدادات", en: "Settings" },
                target: "/settings",
              },
              {
                name: { ar: "فروع المتجر", en: "Store Branches" },
                target: "/settings/branches",
              },
              {
                name: { ar: "بيانات الفرع", en: "Branch Details" },
                target: "",
              },
            ]}
          />
        </div>

        <Flex justify="flex-end">
          <Button
            withTransition
            color="danger"
            onClick={() =>
              setConfirmationModalStatus?.({
                open: true,
                closeCb: handleCloseConfirmationModal!,
                desc: "Are you sure you want to delete this branch ?",
                title: "Delete Branch",
                successCb: handleDeleteBranch,
              })
            }
          >
            Delete Branch
          </Button>
        </Flex>
      </Flex>
      <Spacer size={40} />
      <form onSubmit={infoMethods.handleSubmit(handleEditBranchInfo)}>
        <FormProvider {...infoMethods}>
          <BranchInformation />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              type="submit"
              color="green"
              margin="0 1rem"
              isLoading={editInfoLoading}
              disabled={editInfoLoading}
            >
              Save Changes
            </Button>
          </Flex>
        </FormProvider>
      </form>
      <Spacer size={40} />
      <form onSubmit={locationMethods.handleSubmit(handleEditBranchLocation)}>
        <FormProvider {...locationMethods}>
          <BranchLocation />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              type="submit"
              color="green"
              margin="0 1rem"
              isLoading={locationLoading}
              disabled={locationLoading}
            >
              Save Changes
            </Button>
          </Flex>
        </FormProvider>
      </form>
      <Spacer size={40} />
      <form onSubmit={hoursMethods.handleSubmit(handleEditBranchWorkingHours)}>
        <FormProvider {...hoursMethods}>
          <BranchWorkingHours />
          <Flex justify="center" margin="1rem 0 ">
            <Button
              withTransition
              type="submit"
              color="green"
              margin="0 1rem"
              isLoading={hoursLoading}
              disabled={hoursLoading}
            >
              Save Changes
            </Button>
          </Flex>
        </FormProvider>
      </form>
    </div>
  );
};

export default Branch;
