import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled from "styled-components";
import useResponsive from "../../../hooks/useResponsive";
import { up } from "../../../utils/themes";
import InputErrorMessage from "../InputErrorMessage";
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
   * Default Value
   */
  defaultValue?: any;

  /**
   * Disabled Input boolean
   */
  disabled?: boolean;
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

const IconedInput = ({
  errors,
  register,
  Icon,
  name,
  required,
  label,
  requiredMessage,
  placeholder,
  desc,
  defaultValue,
  disabled,
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
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(name, {
            required: required ? requiredMessage : false,
          })}
        />
      </div>
      {desc && <p className="desc">{desc}</p>}

      <InputErrorMessage msg={errors?.message} />
    </Container>
  );
};

export default IconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      primary,
      secondary,
      accent2,
      border,
      borderHovered,
      dangerRed,
      subtleBackground,
      text,
      borderDanger,
    },
    error,
    rtl,
  }) => `
  label {
    color: ${text};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
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
    input:disabled {
     opacity:50%;
     cursor:not-allowed;
    } 
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
      flex: 1;
      padding: 0.4rem;
      padding-left:${rtl ? "0.4rem" : "35px"};
      padding-right:${rtl ? "35px" : "0.4rem"};
      font-size: 0.8rem; 
      color: ${text};
    }
    &:hover,
    &:focus-within {
      border-color: ${borderHovered};
    }
    
  }

  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${primary};
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
