import { FieldError, RefCallBack } from "react-hook-form";
import { useTranslation } from "react-i18next";

import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

import { FiCalendar } from "react-icons/fi";

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

const DateInput = ({
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

export default DateInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  position: relative;

  label {
    color: ${(props) => props.theme.text};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    position: relative;
    background-color: ${(props) => props.theme.subtleBackground};
    color: ${(props) => props.theme.text};
    border: ${(props) =>
      props.error ? props.theme.borderDanger : props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;

    input:disabled {
      opacity: 50%;
      cursor: not-allowed;
    }
    .icon {
      position: absolute;
      left: ${(props) => (props.rtl ? "" : 0)};
      right: ${(props) => (props.rtl ? 0 : "")};
      padding: 0.4rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.primary};
      z-index: 1;
    }

    input {
      width: 100%;
      cursor: pointer;
      font-weight: ${(props) => props.theme.font.semibold};
      flex: 1;
      padding: 0.4rem;
      padding-left: ${(props) => (props.rtl ? "0.4rem" : "35px")};
      padding-right: ${(props) => (props.rtl ? "35px" : "0.4rem")};
      font-size: 0.8rem;
      color: ${(props) => props.theme.text};
    }
    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
    }
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
    color: ${(props) => props.theme.primary};
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    .input-container {
      input {
        font-size: 0.9rem;
      }
    }
  } ;
`;
