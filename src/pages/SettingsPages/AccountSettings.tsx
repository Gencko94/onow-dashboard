import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import IconedInput from "../../components/reusable/Inputs/IconedInput";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { USER } from "../../interfaces/auth/auth";
import PhoneInput from "../../components/reusable/Inputs/PhoneInput";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import AccountPassword from "../../components/SettingsPage/MainSettingsPage/AccountSettings/AccountPassword";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";
import { AiOutlineMail } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { updateUserAccount } from "../../utils/queries";

import extractError from "../../utils/extractError";
import useToast from "../../hooks/useToast";
import Heading from "../../components/StyledComponents/Heading";

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
    // onSuccess: (data) => {
    //   queryClient.setQueryData<USER | undefined>("auth", (prev) => {
    //     if (prev) {
    //       return {
    //         ...prev,
    //         ...data,
    //       };
    //     }
    //   });
    // },
  });
  const onSubmit: SubmitHandler<USER> = async (data) => {
    console.log(data);
    try {
      await updateUser(data);
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
    <Container>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Account"
          parentLabel="Settings"
          parentTarget="/settings"
        />
      </HeaderContainer>
      <form style={{ margin: "2rem 0 " }} onSubmit={handleSubmit(onSubmit)}>
        <Heading tag="h5" mb="1rem" color="primary">
          Account Information
        </Heading>
        <div onSubmit={handleSubmit(onSubmit)} className="container">
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.first_name}
            register={register}
            required
            requiredMessage="Required"
            label="First Name"
            name="first_name"
          />
          <IconedInput
            Icon={MdSubtitles}
            errors={errors?.last_name}
            register={register}
            required
            requiredMessage="Required"
            label="Last Name"
            name="last_name"
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <PhoneInput
                  label="Phone Number"
                  value={value}
                  errors={errors?.phone}
                  onChange={(data) => onChange(`+${data}`)}
                />
              );
            }}
          />
          <IconedInput
            Icon={AiOutlineMail}
            errors={errors?.email}
            register={register}
            required
            requiredMessage="Required"
            label="Email"
            name="email"
          />
        </div>
        <Flex margin="1rem" justify="center">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            withRipple
            withTransition
            text="Save Changes"
            textSize="0.9rem"
            bg="green"
            padding="0.5rem"
            onClick={handleSubmit(onSubmit)}
          />
        </Flex>
      </form>

      <AccountPassword />
    </Container>
  );
};

export default AccountSettings;

const Container = styled.div`
  .container {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;
