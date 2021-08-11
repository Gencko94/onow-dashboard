import {} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface IProps {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

const RadioButton = ({ label, checked, onChange }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <input onChange={onChange} type="radio" checked={checked} />
      {<label>{label ? t(label) : " "}</label>}
    </Container>
  );
};

export default RadioButton;
const Container = styled.div`
  display: flex;
  align-items: center;
  label {
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }

  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: "";
    width: 12px;
    height: 12px;
    background: ${(props) => props.theme.primary};
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
