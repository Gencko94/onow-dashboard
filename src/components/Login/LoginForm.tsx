import {
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { MdMail } from "react-icons/md";

import styled from "styled-components";
import { LOGIN_FORM } from "../../interfaces/auth/auth";
import Button from "../reusable/Button";
import Input from "../reusable/Input/Input";
import InputErrorMessage from "../reusable/InputErrorMessage";
import PasswordInput from "../reusable/Inputs/PasswordInput";

interface IProps {
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<LOGIN_FORM>;
  onSubmit: (args: any) => void;
  errors: DeepMap<LOGIN_FORM, FieldError>;
  register: UseFormRegister<LOGIN_FORM>;
}

export const LoginForm = ({
  onSubmit,
  handleSubmit,
  isSubmitting,
  errors,
  register,
}: IProps) => {
  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          data-testid="email"
          startAdornment={<MdMail size={20} />}
          errors={errors?.login?.message}
          label="Email"
          {...register("login", {
            required: "Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <InputErrorMessage errors={errors} name="login" />
        <PasswordInput
          errors={errors?.password}
          name="password"
          register={register}
          label="Password"
          required
          requiredMessage="Requried"
        />
        <InputErrorMessage errors={errors} name="password" />

        <Button
          color="primary"
          type="submit"
          style={{ width: "100%" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
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
