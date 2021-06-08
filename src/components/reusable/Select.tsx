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

interface IProps<T> {
  label: string;
  value: T;
  options: T[];
  defaultValue?: any;
  errors: any;
  required?: boolean;
  errorMessage?: string;
  placeholder?: string;
  getOptionLabel: getOptionLabel<T>;
  getOptionValue: getOptionValue<T>;
  isSearchable?: boolean;
  isMulti?: boolean;
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
  required,
  placeholder,
  getOptionLabel,
  getOptionValue,
  errorMessage,
  isSearchable = false,
  isMulti,
  formatGroupLabel,
  formatOptionLabel,
  onChange,
  value,
}: IProps<T>) {
  const { t } = useTranslation();
  const selectStyles:
    | Partial<Styles<any, false, GroupTypeBase<any>>>
    | undefined = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        fontSize: "0.9rem",
        minHeight: "35px",
      }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        padding: "6px",
        display: "grid",
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
      menu: (provided: any) => ({
        ...provided,

        zIndex: 200,
      }),
    };
  }, []);
  return (
    <Container>
      <label>{t(label)}</label>

      <>
        <S
          isMulti={isMulti}
          value={value}
          defaultValue={options.find((i: any) => i.value === defaultValue)}
          isSearchable={isSearchable}
          placeholder={placeholder}
          options={options}
          styles={selectStyles}
          onChange={onChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          formatOptionLabel={formatOptionLabel}
          formatGroupLabel={formatGroupLabel}
        />
        <p className="error">{errors?.message}</p>
      </>
    </Container>
  );
}

const Container = styled.div`
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.dangerRed};
  }
`;
