import { FieldError, RefCallBack } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "react-calendar/dist/Calendar.css";

import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

import { FiCalendar } from "react-icons/fi";
import { up } from "../../../constants";

interface IProps extends ReactDatePickerProps {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;

  /**
   * 	The label of the input.
   */
  label?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;
  ref?: RefCallBack;
  // onChange: (...event: any[]) => void;
  // value: any;
}

const DateIconedInput = ({
  errors,
  disabled,
  label,
  desc,
  ref,
  ...props
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container rtl={language === "ar"} error={Boolean(errors)}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <span className="icon">
          <FiCalendar size={21} />
        </span>
        <DatePicker withPortal portalId="portal-root" {...props} />
      </div>
      {desc && <p className="desc">{desc}</p>}

      {errors && <p className="error">{errors?.message}</p>}
    </Container>
  );
};

export default DateIconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      text,
      subtleBackground,
      border,
      borderDanger,
      font,
      primary,
      dangerRed,
      borderHovered,
    },
    error,
    rtl,
  }) => `
  

  position: relative;
  
  label {
    color: ${text};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: ${font.regular};
    display: inline-block;
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
      z-index:1;
    }

    input {
      width:100%;
      cursor:pointer;
      font-weight:${font.semibold};
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
