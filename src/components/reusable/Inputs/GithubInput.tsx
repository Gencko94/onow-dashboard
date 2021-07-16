import { Control, Controller } from "react-hook-form";
import styled from "styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Heading from "../../StyledComponents/Heading";
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
        <Heading mb="0.25rem" weight="semibold" tag="h6">
          {label}
        </Heading>
        {desc && <p className="first-subtitle">{desc}</p>}
        {secondaryDesc && <p className="second-subtitle">{secondaryDesc}</p>}
      </div>

      <Toggle
        defaultChecked={defaultValue}
        checked={checked}
        onChange={onChange}
      />
    </Container>
  );
};

export default GithubInput;
const Container = styled.div(
  ({ theme: { breakpoints, textPrimary, textSecondary, font } }) => `
  display: flex;
  align-items: center;
  gap:1rem;
  .text-container {
    flex: auto;
   
    .first-subtitle {
      color: ${textPrimary};
      font-size: 0.7rem;
      margin-bottom: 0.25rem;
    }
    .second-subtitle {
      color: ${textSecondary};
      font-size: 0.7rem;
      font-weight: ${font.regular};
    }
  }
  @media ${breakpoints.md}{
    .text-container {

     
      .first-subtitle {
        color: ${textPrimary};
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
      }
      .second-subtitle {
        color: ${textSecondary};
        font-size: 0.79rem;
        font-weight: ${font.regular};
      }
    }
  }
  `
);
