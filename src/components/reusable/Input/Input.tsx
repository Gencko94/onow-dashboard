import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { up } from "../../../constants";
import Paragraph from "../../StyledComponents/Paragraph";
import InputErrorMessage from "../InputErrorMessage";

interface BaseInputProps extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * 	Start Adornment.
   */
  startAdornment?: any;
  /**
   * 	End Adornment.
   */
  endAdornment?: any;
  /**
   * 	The label of the input.
   */
  label?: string;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;
  /**
   * 	Error Message
   */
  errors?: any;
}

const Input = forwardRef<HTMLDivElement, BaseInputProps>(
  (
    { label, startAdornment, endAdornment, desc, errors, ...delegated },
    ref
  ) => {
    return (
      <div>
        {label && <Label htmlFor={delegated.id}>{label}</Label>}
        <InputWrapper ref={ref} disabled={delegated.disabled}>
          {startAdornment &&
            (typeof startAdornment === "object" ? (
              <Adornment data-testid="start-adornment">
                {startAdornment}
              </Adornment>
            ) : (
              <TextAdornment>{startAdornment}</TextAdornment>
            ))}
          <DefaultInput id={delegated.id} {...delegated} />
          {endAdornment &&
            (typeof endAdornment === "object" ? (
              <Adornment data-testid="end-adornment">{endAdornment}</Adornment>
            ) : (
              <TextAdornment>{endAdornment}</TextAdornment>
            ))}
        </InputWrapper>
        {desc && (
          <InputDesc color="primary" weight="bold">
            {desc}
          </InputDesc>
        )}
      </div>
    );
  }
);

export default Input;

const InputWrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: ${(props) => props.theme.subtleBackground};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  transition: 150ms border ease-out;
  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${(props) => !props.disabled && props.theme.secondary};
  }
  ${(props) =>
    props.disabled &&
    css`
      opacity: 50%;
      cursor: not-allowed;
    `}
`;

const Label = styled.label`
  color: ${(props) => props.theme.textAlt};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: block;
  font-weight: ${(props) => props.theme.font.semibold};
`;
const InputDesc = styled(Paragraph)`
  font-size: 0.8rem;
`;
const BaseInput = styled.input(
  ({ theme: { breakpoints, text } }) => `
width: 100%;

font-size: 0.9rem;
color: ${text};
flex: 1;
outline: none;
min-width: 0;
&:disabled {
    cursor: not-allowed;
}
padding: 0.4rem;
${up(breakpoints.md)} {
    padding: 0.5rem;
}

`
);
const DefaultInput = styled(BaseInput)``;

const Adornment = styled.span(
  ({ theme: { breakpoints, primary, subtleBackground } }) => `
  padding: 0.4rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${primary};
  background-color: ${subtleBackground};
  ${up(breakpoints.md)} {
      padding: 0.5rem;
    }
    
    `
);
const TextAdornment = styled(Adornment)`
  background-color: gray;
`;
