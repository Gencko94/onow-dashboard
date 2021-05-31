import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface IProps {
  /**
   * 	Input's name being registered.
   */
  name: string;
  /**
   * 	```control``` object provided by ```useForm```.
   */
  control: Control<any>;
  /**
   * 	The label of the input.
   */
  label?: string;
}

const Checkbox = ({ control, name, label }: IProps) => {
  const { t } = useTranslation();
  return (
    <Controller
      defaultValue={false}
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Container>
            {label && t(label)}
            <input type="checkbox" onChange={onChange} checked={value} />
            <span className="check" />
          </Container>
        );
      }}
    />
  );
};

export default Checkbox;
const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;

  cursor: pointer;
  font-size: 0.9rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 75ms ease;
  &:hover {
    font-weight: ${(props) => props.theme.font.semibold};
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .check {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 7px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  input:checked ~ .check {
    background-color: ${(props) => props.theme.mainColor};
  }
  input:checked ~ .check:after {
    display: block;
  }
`;
