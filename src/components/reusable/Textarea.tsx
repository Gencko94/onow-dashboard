import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";

interface IProps {
  register: UseFormRegister<any>;
  errors: any;
  name: string;
  rows?: number;
  required?: boolean;
  requiredMessage?: string;
  label: string;

  desc?: string;
}

const Textarea = ({
  errors,
  register,
  rows = 4,
  name,
  required,
  label,
  requiredMessage,

  desc,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      <label>{label}</label>

      <textarea
        rows={rows}
        {...register(name, {
          required: required ? requiredMessage : false,
        })}
      />

      {desc && <p className="desc">{desc}</p>}
      <p className="error">{errors?.message}</p>
    </Container>
  );
};

export default Textarea;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  textarea {
    width: 100%;
    padding: 0.4rem;
    font-size: 0.8rem;
    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;

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
`;
