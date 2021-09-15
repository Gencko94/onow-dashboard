import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CgPassword } from "react-icons/cg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ErrorMessage } from "@hookform/error-message";

import styled, { css } from "styled-components";
import InputErrorMessage from "../InputErrorMessage";
interface BaseInput {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: any;
  /**
   * 	Input's name being registered.
   */
  name: string;

  /**
   * 	The label of the input.
   */
  label?: string;
  /**
   * 	```register``` object provided by ```useForm```.
   */
  register: UseFormRegister<any>;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;

  /**
   * 	Optional placeholder for the input.
   */
  placeholder?: string;
  /**
   * Default Value
   */
  defaultValue?: any;
}
interface RequiredInput extends BaseInput {
  /**
   * 	Optional. Marks the input as ```required```.
   */
  required: boolean;
  /**
   * The Message text to show when the field is ```required```.
   *
   * Required when ```required``` is provided.
   */
  requiredMessage: string;
}
interface NotRequiredInput extends BaseInput {
  required?: never;
  requiredMessage?: never;
}

type IProps = RequiredInput | NotRequiredInput;

const PasswordInput = ({
  errors,
  register,
  name,
  required,
  label,
  requiredMessage,
  placeholder,
  desc,
  defaultValue,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label htmlFor="password">{label}</label>}
      <div className="input-container">
        <span className="icon">
          <CgPassword size={21} />
        </span>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(name, {
            required: required ? requiredMessage : false,
          })}
        />
        <span className="visibility" onClick={() => handleShowPassword()}>
          {showPassword ? (
            <MdVisibilityOff size={21} />
          ) : (
            <MdVisibility size={21} />
          )}
        </span>
      </div>
      {desc && <p className="desc">{desc}</p>}
      {/* <InputErrorMessage errors={errors} name={name} /> */}
    </Container>
  );
};

export default PasswordInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${(props) => props.theme.text};
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: ${(props) => props.theme.subtleBackground};
    color: ${(props) => props.theme.text};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.primary};
    }

    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
    }
    ${(props) =>
      props.error &&
      css`
        border-color: ${(props) => props.theme.dangerRed} !important;
      `}
  }
  .visibility {
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${(props) => props.theme.primary};
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
  } ;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.4rem;
  font-size: 0.8rem;
  width: 50px;

  color: ${(props) => props.theme.text};

  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    font-size: 0.9rem;
  } ;
`;
