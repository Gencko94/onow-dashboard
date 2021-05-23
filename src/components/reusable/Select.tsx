import { useTranslation } from "react-i18next";
import styled from "styled-components";
import S, { GroupTypeBase, Styles } from "react-select";
import { useMemo } from "react";
import { getOptionLabel, getOptionValue } from "react-select/src/builtins";
import { Control, Controller } from "react-hook-form";

interface IProps {
  label: string;
  control: Control<any>;
  name: string;
  options: any;
  defaultValue: any;
  errors: any;
  required?: boolean;
  errorMessage?: string;
  placeholder?: string;
  getOptionLabel: getOptionLabel<any>;
  getOptionValue: getOptionValue<any>;
  isSearchable?: boolean;
  isMulti?: boolean;
}

const Select = ({
  label,
  control,
  name,
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
}: IProps) => {
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
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? errorMessage : false }}
        defaultValue={defaultValue}
        render={({ field: { ref, onChange } }) => (
          <>
            <S
              isMulti={isMulti}
              defaultValue={options.find((i: any) => i.value === defaultValue)}
              isSearchable={isSearchable}
              placeholder={placeholder}
              ref={ref}
              options={options}
              styles={selectStyles}
              onChange={(val) => {
                console.log(val);
                onChange(val.value);
              }}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
            />
            <p className="error">{errors?.message}</p>
          </>
        )}
      />
    </Container>
  );
};

export default Select;
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
