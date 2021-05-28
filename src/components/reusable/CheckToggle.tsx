import { Control, Controller } from "react-hook-form";
import Toggle from "react-toggle";
import styled from "styled-components";
import "react-toggle/style.css";
interface IProps {
  /**
   * 	```control``` object provided by ```useForm```.
   */
  control: Control<any>;
  /**
   * 	Input's name being registered.
   */
  name: string;
  /**
   * 	The label of the input.
   */
  label: string;
  /**
   * 	Optional description shown in a smaller size text below the label.
   */
  desc?: string;
}

const CheckToggle = ({ control, name, label, desc }: IProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <Toggler>
            <div className="info">
              <label>{label}</label>
              <p className="desc">{desc}</p>
            </div>
            <Toggle
              defaultChecked={value}
              className="react-custom-toggle"
              ref={ref}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
          </Toggler>
        );
      }}
    ></Controller>
  );
};

export default CheckToggle;

const Toggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .desc {
    font-size: 0.8rem;
  }
`;