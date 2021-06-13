import { Control, Controller } from "react-hook-form";
import Toggle from "react-toggle";
import styled from "styled-components";
import "react-toggle/style.css";
interface IProps {
  /**
   * 	The label of the input.
   */
  label: string;
  /**
   * 	Optional description shown in a smaller size text below the label.
   */
  desc?: string;
  /**
   * 	```onChange``` callback function.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 	Boolean indicated whether the input is checked.
   */
  checked: boolean;
}

const CheckToggle = ({ checked, onChange, label, desc }: IProps) => {
  return (
    <Toggler>
      <div className="info">
        <label htmlFor={label}>{label}</label>
        <p className="desc">{desc}</p>
      </div>
      <Toggle
        id={label}
        checked={checked as boolean}
        className="react-custom-toggle"
        onChange={onChange}
      />
    </Toggler>
  );
};

export default CheckToggle;

const Toggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .info {
    font-size: 0.9rem;
    margin: 0 0.25rem;
    label {
      cursor: pointer;
    }
  }
  .desc {
    font-size: 0.8rem;
  }
`;
