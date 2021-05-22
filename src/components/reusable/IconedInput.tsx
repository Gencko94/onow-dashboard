import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";

interface IProps {
  register: any;
  errors: any;
  name: string;
  Icon: IconType;
  required?: boolean;
  requiredMessage?: string;
  label: string;
}

const IconedInput = ({
  errors,
  register,
  Icon,
  name,
  required,
  label,
  requiredMessage,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.[name])}>
      <label>{label}</label>
      <div className="input-container">
        <span className="icon">
          <Icon size={21} />
        </span>

        <input
          {...register(name, { required: required ? requiredMessage : false })}
        />
      </div>
      <p className="error">{errors?.[name]?.message}</p>
    </Container>
  );
};

export default IconedInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>`
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.subHeading};
      background-color: ${(props) => props.theme.inputColorLight};
      border-right: ${(props) => props.theme.border};
      ${(props) =>
        props.rtl &&
        css`
          border-right: none;
          border-left: ${(props) => props.theme.border};
        `}
    }

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
      width: 50px;
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
`;
