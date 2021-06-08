import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";
interface BaseInput {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;
  /**
   * 	Input's name being registered.
   */
  name: string;
  /**
   * 	The icon to show.
   */
  Icon: IconType;
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
   * 	Prefix text.
   */
  prefix?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
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

const PrefixedIconedInput = ({
  errors,
  register,
  Icon,
  name,
  required,
  label,
  requiredMessage,
  placeholder,
  desc,
  prefix,
  disabled,
  defaultValue,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <span className="icon">
          <Icon size={21} />
        </span>

        <input
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          {...register(name, {
            required: required ? requiredMessage : false,
          })}
        />
        <span className="prefix">{prefix}</span>
      </div>
      {desc && <p className="desc">{desc}</p>}
      <p className="error">{errors?.message}</p>
    </Container>
  );
};

export default PrefixedIconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.mainColor};
      background-color: ${(props) => props.theme.inputColorLight};
      border-right: ${(props) => props.theme.border};
      ${(props) =>
        props.rtl &&
        css`
          border-right: none;
          border-left: ${(props) => props.theme.border};
        `}
    }

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
      width: 50px;
      &:disabled {
        background-color: ${(props) => props.theme.inputColorLight};
      }
    }
    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
      background-color: ${(props) => props.theme.inputColorLight};
    }
    ${(props) =>
      props.error &&
      css`
        border-color: ${(props) => props.theme.dangerRed} !important;
      `}
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.dangerRed};
  }
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${(props) => props.theme.mainColor};
  }
  .prefix {
    padding: 0.4rem;
    display: flex;
    font-size: 0.8rem;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.subHeading};
    background-color: ${(props) => props.theme.inputColorLight};
    border-left: ${(props) => props.theme.border};
    ${(props) =>
      props.rtl &&
      css`
        border-left: none;
        border-right: ${(props) => props.theme.border};
      `}
  }
`;
