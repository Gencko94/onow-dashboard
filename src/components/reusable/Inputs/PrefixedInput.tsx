import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled, { css } from "styled-components";

interface IProps {
  register: UseFormRegister<any>;
  errors: any;
  name: string;
  prefixText: string;
  required?: boolean;
  requiredMessage?: string;
  label: string;
  number?: boolean;
  min?: number;
  max?: number;
  desc?: string;
  /**
   * Default Value
   */
  defaultValue?: any;
}

const PrefixedInput = ({
  errors,
  register,
  prefixText,
  name,
  required,
  label,
  requiredMessage,
  number,
  min,
  max,
  desc,
  defaultValue,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      <label>{label}</label>
      <div className="input-container">
        <div className="prefix">
          <p>{prefixText}</p>
        </div>

        <input
          defaultValue={defaultValue}
          type={number ? "number" : "text"}
          min={min!}
          max={max!}
          {...register(name, {
            required: required ? requiredMessage : false,
            min: {
              value: min!,
              message: "Only Positive",
            },
          })}
        />
      </div>
      {desc && <p className="desc">{desc}</p>}
      <p className="error">{errors?.message}</p>
    </Container>
  );
};

export default PrefixedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      headingColor,
      border,
      inputColorLight,
      mainColor,
      borderHovered,
      dangerRed,
      subHeading,
    },
    error,
    rtl,
  }) => `
  label {
    color: ${headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;
    
    justify-content: center;
    
    background-color: #fff;
    color: ${headingColor};
    border: ${border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .prefix {
      padding: 0.4rem;
      display: flex;
      font-size: 0.7rem;
      align-items: center;
      justify-content: center;
      color: ${subHeading};
      background-color: ${inputColorLight};
      border-right: ${border};
      ${
        rtl &&
        css`
          border-right: none;
          border-left: ${(props) => props.theme.border};
        `
      }
      }
      
      input {
        flex: 1;
        padding: 0.4rem;
        font-size: 0.8rem;
        width: 50px;
      }
      &:hover,
      &:focus-within {
        border-color: ${borderHovered};
        background-color: ${inputColorLight};
      }
      ${
        error &&
        css`
          border-color: ${(props) => props.theme.dangerRed} !important;
        `
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
        color: ${mainColor};
      }
      @media  ${breakpoints.md}{
        label {
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        };
        .input-container{
          input {
            font-size: 0.9rem;
          }
        };
        .prefix {
          font-size:0.8rem;
        }
    
      };
      `
);
