import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";
import Input from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled, { css } from "styled-components";
import InputErrorMessage from "../InputErrorMessage";
type CountryData = {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
};
interface IProps {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;
  /**
   * 	Inputs Label.
   */

  label?: string;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;
  /**
   * Input's ```value```
   */
  value: any;
  /**
   * onChange handler
   */

  disabled?: boolean;
  onChange: (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;

  /**
   * default country
   */
  defaultCountry?: string;
}

const PhoneInput = ({
  errors,
  defaultCountry = "kw",
  label,
  onChange,
  value,
  disabled,
  desc,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label>{label}</label>}

      <Input
        value={value}
        country={defaultCountry}
        inputStyle={{ width: "100%" }}
        autoFormat
        disabled={disabled}
        autocompleteSearch
        onChange={onChange}
      />

      {desc && <p className="desc">{desc}</p>}
      <InputErrorMessage msg={errors?.message} />
    </Container>
  );
};

export default PhoneInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }

  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${(props) => props.theme.primary};
  }
`;
