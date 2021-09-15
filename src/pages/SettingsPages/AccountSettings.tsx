import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import Input from "../../components/reusable/Input/Input";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { USER } from "../../interfaces/auth/auth";
import PhoneInput from "../../components/reusable/Inputs/PhoneInput";
import AccountPassword from "../../components/SettingsPage/MainSettingsPage/AccountSettings/AccountPassword";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";
import { AiOutlineMail } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { updateUserAccount } from "../../utils/queries";

import extractError from "../../utils/extractError";
import useToast from "../../hooks/useToast";
import Heading from "../../components/StyledComponents/Heading";
import Box from "../../components/reusable/Box/Box";
import Grid from "../../components/StyledComponents/Grid";
import Spacer from "../../components/reusable/Spacer";

const AccountSettings = () => {
  const { user } = useContext(AuthProvider);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<USER>({ defaultValues: user });
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    mutateAsync: updateUser,
    reset,
    isLoading,
  } = useMutation(updateUserAccount, {
    onSuccess: (data) => {
      queryClient.setQueryData<USER | undefined>("auth", (prev) => {
        if (prev) {
          return {
            ...prev,
            first_name: data.first_name,
            last_name: data.last_name,
          };
        }
      });
    },
  });
  const onSubmit: SubmitHandler<USER> = async (data) => {
    console.log(data);
    try {
      await updateUser({
        first_name: data.first_name,
        last_name: data.last_name,
      });
      setToastStatus?.({
        fn: () => handleCloseToast?.(),
        open: true,
        text: "Changes Saved successfully",
        type: "success",
      });
    } catch (error) {
      const { responseError } = extractError(error);
      console.log(responseError);

      if (responseError) {
        if (responseError.phone?.includes("phone belongs to another account")) {
          setError("phone", { message: "This phone belongs to other user" });
        }
      } else {
        setToastStatus?.({
          open: true,
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          type: "error",
          text: "Something Went Wrong",
        });
      }
    }
  };
  return (
    <>
      <Heading tag="h5" type="large-title">
        Account Settings
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "بيانات الحساب", en: "Account Settings" },
            target: "",
          },
        ]}
      />
      <Spacer size={40} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box type="titled" boxTitle="Account Information">
          <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
            <Input
              startAdornment={<MdSubtitles />}
              errors={errors}
              label="First Name"
              {...register("first_name", { required: "Required" })}
            />
            <Input
              startAdornment={<MdSubtitles />}
              errors={errors}
              label="Last Name"
              {...register("last_name", { required: "Required" })}
            />
          </Grid>
          <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <PhoneInput
                    desc="Phone Number Cannot be changed"
                    disabled
                    label="Phone Number"
                    value={value}
                    errors={errors?.phone}
                    onChange={(data) => onChange(`+${data}`)}
                  />
                );
              }}
            />
            <Input
              desc="Email Cannot be changed"
              startAdornment={<AiOutlineMail />}
              errors={errors}
              disabled
              label="Email"
              {...register("email", { required: "Required" })}
            />
          </Grid>
        </Box>
        <Flex margin="1rem" justify="center">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            withTransition
            color="green"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
        </Flex>
      </form>
      <Spacer size={40} />
      <AccountPassword />
    </>
  );
};

export default AccountSettings;
