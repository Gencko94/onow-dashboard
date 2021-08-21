import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";

import useToast from "../../../../hooks/useToast";
import extractError from "../../../../utils/extractError";
import { changeUserPassword } from "../../../../utils/queries";
import Box from "../../../reusable/Box/Box";
import Button from "../../../reusable/Button";
import PasswordInput from "../../../reusable/Inputs/PasswordInput";
import Flex from "../../../StyledComponents/Flex";
import Heading from "../../../StyledComponents/Heading";

interface PASSWORD_FORM {
  current_password: string;
  password: string;
}
const AccountPassword = () => {
  const {
    mutateAsync: changePassword,
    reset,
    isLoading,
  } = useMutation(changeUserPassword);
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<PASSWORD_FORM>();
  const onSubmit: SubmitHandler<PASSWORD_FORM> = async (data) => {
    try {
      await changePassword({
        current_password: data.current_password,
        password: data.password,
      });
      setToastStatus?.({
        fn: () => handleCloseToast?.(),
        open: true,
        text: "Password Changed successfully",
        type: "success",
      });
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError?.current_password) {
        setError("current_password", {
          message: "Password Not Correct",
        });
      }

      if (responseError) {
      } else {
        setToastStatus?.({
          open: true,
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          text: "Something Went Wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box type="titled" boxTitle="Change Account password">
        <PasswordInput
          register={register}
          name="current_password"
          required
          requiredMessage="Required"
          label="Old Password"
          errors={errors?.current_password}
        />
        <PasswordInput
          register={register}
          name="password"
          required
          requiredMessage="Required"
          label="New Password"
          errors={errors?.password}
        />
      </Box>
      <Flex margin="1rem" justify="center">
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          withTransition
          color="green"
        >
          Change Password
        </Button>
      </Flex>
    </form>
  );
};

export default AccountPassword;
