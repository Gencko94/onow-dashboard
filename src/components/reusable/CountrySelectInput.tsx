import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled, { css } from "styled-components";
interface IProps {
  /**
   * 	The label of the input.
   */
  label?: string;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;

  /**
   * 	Optional placeholder for the input.
   */
  placeholder?: string;
  /**
   * Default Input Value
   */
  defaultInputValue?: any;
  /**
   * Default Select Value
   */
  defaultSelectValue?: any;
  /**
   * Select Options
   */
  selectOptions: any[];
  selectValue: any;

  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectChange: (country: any) => void;
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;
}

export default function CountrySelectInput({
  selectOptions,
  selectValue,
  defaultInputValue,
  defaultSelectValue,

  desc,
  label,
  onSelectChange,
  placeholder,
  onInputChange,
  errors,
}: IProps) {
  const {
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <div onClick={() => setOpen(true)} className="flag-container">
          <img src={selectValue.flag} alt={selectValue.name} />
          <p>{selectValue.dialCode}</p>
        </div>
        <input
          onChange={onInputChange}
          defaultValue={defaultInputValue}
          placeholder={placeholder}
        />
        {open && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            {
              <div className="dropdown">
                {selectOptions.map((country) => (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectChange(country);
                      setOpen(false);
                    }}
                    className="country"
                  >
                    <img src={country.flag} alt={country.name} />
                    <p>{country.name}</p>
                  </button>
                ))}
              </div>
            }
          </ClickAwayListener>
        )}
      </div>
      {desc && <p className="desc">{desc}</p>}
      <p className="error">{errors?.message}</p>
    </Container>
  );
}

const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  .input-container {
    display: grid;
    position: relative;
    grid-template-columns: 80px 1fr;

    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};

    border-radius: 6px;
    transition: all 150ms ease;

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
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
  .flag-container {
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${(props) => props.theme.inputColorLight};
    border-right: ${(props) => props.theme.border};
    ${(props) =>
      props.rtl &&
      css`
        border-right: none;
        border-left: ${(props) => props.theme.border};
      `}
    img {
      width: 27px;
      height: 27px;
    }
    p {
      margin: 0 0.25rem;
      font-size: 0.9rem;
    }
  }
  .dropdown {
    position: absolute;
    background-color: #fff;
    max-height: 300px;
    overflow-y: auto;
    top: 110%;
    left: 0;
    z-index: 2;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    .country {
      font-size: 0.7rem;
      width: 100%;
      padding: 0.25rem 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      p {
        margin: 0 0.25rem;
      }
      &:hover {
        background-color: ${(props) => props.theme.highlightColor};
      }
    }
  }
`;
