import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdMail } from "react-icons/md";

import styled from "styled-components";
import { useLogin } from "../../hooks/data-hooks/useLogin";
import { LOGIN_FORM } from "../../interfaces/auth/auth";
import Button from "../reusable/Button";
import Input from "../reusable/Input/Input";
import PasswordInput from "../reusable/Inputs/PasswordInput";
import Spacer from "../reusable/Spacer";

export const LoginForm = () => {
  const { t } = useTranslation(["login"]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LOGIN_FORM>();
  const { isLoading, mutateAsync } = useLogin({ setError });
  const onSubmit: SubmitHandler<LOGIN_FORM> = async (data) => {
    try {
      await mutateAsync({
        password: data.password,
        login: data.login.toLowerCase(),
      });
    } catch (error: any) {
      if (
        error.response?.data.error === "Phone Number or Password is Missing"
      ) {
        setError("password", {
          message: t("fields-missing-response"),
        });
        setError("login", {
          message: t("fields-missing-response"),
        });
      } else if (error.response?.data.error === "INVALID_CREDENTIALS") {
        setError("password", {
          message: t("invalid-credentials"),
        });
        setError("login", {
          message: t("invalid-credentials"),
        });
      } else {
        // show unknown error
      }
    }
  };
  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          data-testid="email"
          startAdornment={<MdMail size={20} />}
          errors={errors}
          label="Email"
          {...register("login", {
            required: "Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <Spacer size={10} />
        <PasswordInput
          errors={errors}
          label="Password"
          {...register("password", {
            required: "Required",
          })}
        />
        <Spacer size={30} />

        <Button
          data-testid="login-btn"
          color="primary"
          type="submit"
          style={{ width: "100%" }}
          isLoading={isLoading}
          disabled={isLoading}
          withTransition
        >
          Login
        </Button>
      </form>
    </FormContainer>
  );
};

// export default LoginForm;
const FormContainer = styled.div`
  padding: 1rem;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
  /* background-color: ${(props) => props.theme.subtleFloating}; */
  border-radius: 12px;
  min-width: 300px;
  margin-bottom: 0.5rem;
`;
