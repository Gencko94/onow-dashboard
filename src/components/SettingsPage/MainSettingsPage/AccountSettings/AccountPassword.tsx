import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";

import useToast from "../../../../hooks/useToast";
import extractError from "../../../../utils/extractError";
import { changeUserPassword } from "../../../../utils/queries";
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
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h5" mb="1rem" color="primary" weight="semibold">
        Change Account password
      </Heading>
      <div className="container">
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
      </div>
      <Flex margin="1rem" justify="center">
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          withRipple
          withTransition
          textSize="0.9rem"
          bg="green"
          padding="0.5rem"
        >
          Change Password
        </Button>
      </Flex>
    </Container>
  );
};

export default AccountPassword;
const Container = styled.form`
  margin: 2rem 0;
`;
