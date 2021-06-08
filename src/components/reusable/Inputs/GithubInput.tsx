import { Control, Controller } from "react-hook-form";
import styled from "styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css";
interface IProps {
  /**
   * Primary Label.
   */
  label: string;
  /**
   * Optional Primary description.
   */
  desc?: string;
  /**
   * Optional Secondary description.
   */
  secondaryDesc?: string;
  /**
   * ```onChange``` callback.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * ```checked``` boolean
   */
  checked: boolean;
  defaultValue?: boolean;
}

const GithubInput = ({
  onChange,
  checked,
  label,
  desc,
  defaultValue,
  secondaryDesc,
}: IProps) => {
  return (
    <Container>
      <div className="text-container">
        <h6>{label}</h6>
        {desc && <p className="first-subtitle">{desc}</p>}
        {secondaryDesc && <p className="second-subtitle">{secondaryDesc}</p>}
      </div>
      <div>
        <Toggle
          defaultChecked={defaultValue}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </Container>
  );
};

export default GithubInput;
const Container = styled.div`
  display: flex;
  align-items: center;

  .text-container {
    flex: auto;
    h6 {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
    .first-subtitle {
      color: ${(props) => props.theme.headingColor};
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }
    .second-subtitle {
      color: ${(props) => props.theme.subHeading};
      font-size: 0.75rem;
      font-weight: ${(props) => props.theme.font.light};
    }
  }
`;
