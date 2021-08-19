import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";
import useResponsive from "../../../hooks/useResponsive";
import { up } from "../../../utils/themes";
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
  const { isDesktop } = useResponsive();

  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <span className="icon">
          <Icon size={isDesktop ? 21 : 19} />
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
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      subtleBackground,
      border,

      borderHovered,
      dangerRed,
      text,
      primary,
      accent1,
      accent2,

      borderDanger,
    },
    error,
    rtl,
  }) => `
  label {
    color: ${text};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${font.regular};
    display: block;
  }
  .input-container {
    position: relative;
    background-color: ${subtleBackground};
    color: ${text};
    border: ${error ? borderDanger : border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      position:absolute;
      left:${rtl ? "" : 0};
      right:${rtl ? 0 : ""};
      padding: 0.4rem;
      height:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${primary};
      
    }

    input {
      
      width:100%;
      padding: 0.4rem;
      padding-left:35px;
      padding-right:35px;
      font-size: 0.8rem; 
      color: ${text};

      &:disabled {
        background-color:${accent2};
        cursor:not-allowed;
        opacity:50%;
      }
      &:not(:disabled):hover , &:focus-within {
        border-color: ${borderHovered};
      }
    }
   
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${dangerRed};
  }
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${primary};
  }
  .prefix {
    position:absolute;
    top:0;
    left:${rtl ? 0 : ""};
    right:${rtl ? "" : 0};
    padding: 0.4rem;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${primary};
    font-size:0.9rem;
   
  }
  ${up(breakpoints.md)}{
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    .input-container{
      
      input {
        font-size: 0.9rem;
      }
    }

  };
`
);
