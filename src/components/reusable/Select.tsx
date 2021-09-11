import { useTranslation } from "react-i18next";
import styled from "styled-components";
import S, {
  ActionMeta,
  FormatOptionLabelMeta,
  GroupTypeBase,
  Styles,
} from "react-select";
import { useMemo } from "react";
import {
  formatGroupLabel,
  getOptionLabel,
  getOptionValue,
} from "react-select/src/builtins";
import InputErrorMessage from "./InputErrorMessage";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { up } from "../../constants";

interface IProps<T> {
  label?: string;
  value: T;
  options: T[];
  defaultValue?: any;
  errors?: any;
  isLoading?: boolean;
  placeholder?: string;
  getOptionLabel: getOptionLabel<T>;
  getOptionValue: getOptionValue<T>;
  isSearchable?: boolean;
  isMulti?: boolean;
  ref?: any;
  formatOptionLabel?: (
    option: any,
    labelMeta: FormatOptionLabelMeta<any, boolean>
  ) => React.ReactNode;
  formatGroupLabel?: formatGroupLabel<any, any>;
  onChange:
    | (((value: any, actionMeta: ActionMeta<any>) => void) &
        ((value: any, action: ActionMeta<any>) => void))
    | undefined;
}

export default function Select<T>({
  label,
  options,
  errors,
  defaultValue,
  isLoading,
  placeholder,
  getOptionLabel,
  getOptionValue,

  isSearchable = false,
  isMulti,
  formatGroupLabel,
  formatOptionLabel,
  ref,
  onChange,
  value,
}: IProps<T>) {
  const { currentTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const selectStyles:
    | Partial<Styles<any, false, GroupTypeBase<any>>>
    | undefined = useMemo(() => {
    return {
      valueContainer: (provided) => {
        return {
          ...provided,
          padding: "0.4rem",
        };
      },
      control: (provided) => {
        return {
          ...provided,
          fontSize: "0.9rem",
          minHeight: "35.78px",
          backgroundColor: currentTheme!.subtleBackground,
          border: currentTheme.border,
          borderRadius: "6px",

          ":hover": {
            ...provided[":hover"],
            borderColor: currentTheme.borderHovered,
          },
        };
      },
      singleValue: (provided) => ({
        ...provided,

        color: currentTheme!.text,
      }),
      multiValue: (provided) => ({
        ...provided,

        backgroundColor: currentTheme!.background,
      }),
      multiValueLabel: (provided) => ({
        ...provided,

        color: currentTheme!.text,
      }),

      dropdownIndicator: (provided) => ({
        ...provided,
        padding: "6px",
        display: "grid",
      }),
      option: (provided, { isDisabled, isSelected, isFocused }) => {
        return {
          ...provided,
          fontSize: "0.9rem",
          backgroundColor: isSelected
            ? currentTheme!.primary
            : isFocused
            ? currentTheme!.background
            : currentTheme!.subtleFloating,
          ":active": {
            ...provided[":active"],
            backgroundColor:
              !isDisabled &&
              (isSelected ? currentTheme!.primary : currentTheme!.background),
          },
        };
      },

      menuPortal: (provided: any) => {
        return {
          ...provided,
          zIndex: 9999,
        };
      },

      menu: (provided: any) => {
        return {
          ...provided,
          backgroundColor: currentTheme!.subtleFloating,
        };
      },
    };
  }, [currentTheme]);
  return (
    <Container>
      {label && <label>{t(label)}</label>}

      <S
        ref={ref}
        isLoading={isLoading}
        isMulti={isMulti}
        value={value}
        defaultValue={options.find((i: any) => i.value === defaultValue)}
        isSearchable={isSearchable}
        placeholder={placeholder}
        options={options}
        styles={selectStyles}
        menuPortalTarget={document.body}
        onChange={onChange}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        formatOptionLabel={formatOptionLabel}
        formatGroupLabel={formatGroupLabel}
        menuShouldScrollIntoView={false}
      />
      {/* {errors && <InputErrorMessage msg={errors?.message} />} */}
    </Container>
  );
}

const Container = styled.div(
  ({ theme: { breakpoints, text, font, dangerRed } }) => `
  label {
    color: ${text};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${font.semibold};
    display: inline-block;
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${dangerRed};
  }
   ${up(breakpoints.md)}{
    font-size: 0.9rem;
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    };
  }
  `
);
