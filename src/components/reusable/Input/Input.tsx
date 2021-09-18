import { forwardRef } from "react";
import { DeepMap, FieldError, get } from "react-hook-form";
import styled, { css } from "styled-components";

import Paragraph from "../../StyledComponents/Paragraph";
import InputErrorMessage from "../InputErrorMessage";
import { InputLabel } from "../InputLabel/InputLabel";
import { BaseInput } from "./BaseInput";
import { InputAdornment, TextAdornment } from "./InputAdornment";

interface BaseInputProps extends React.ComponentPropsWithRef<"input"> {
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
  errors?: DeepMap<any, FieldError>;
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, startAdornment, endAdornment, desc, errors, ...delegated },
    ref
  ) => {
    return (
      <div>
        {label && <InputLabel htmlFor={delegated.name}>{label}</InputLabel>}
        <InputWrapper
          data-testid="input-wrapper"
          disabled={delegated.disabled}
          errors={typeof get(errors, delegated.name as string) !== "undefined"}
        >
          {startAdornment &&
            (typeof startAdornment === "object" ? (
              <InputAdornment data-testid="start-adornment">
                {startAdornment}
              </InputAdornment>
            ) : (
              <TextAdornment>{startAdornment}</TextAdornment>
            ))}
          <BaseInput ref={ref} id={delegated.name} {...delegated} />
          {endAdornment &&
            (typeof endAdornment === "object" ? (
              <InputAdornment data-testid="end-adornment">
                {endAdornment}
              </InputAdornment>
            ) : (
              <TextAdornment>{endAdornment}</TextAdornment>
            ))}
        </InputWrapper>
        {desc && (
          <InputDesc color="primary" weight="bold">
            {desc}
          </InputDesc>
        )}
        {errors && <InputErrorMessage errors={errors} name={delegated.name} />}
      </div>
    );
  }
);

export default Input;

export const InputWrapper = styled.div<{ disabled?: boolean; errors: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: ${(props) => props.theme.subtleBackground};
  border: ${(props) =>
    props.errors ? props.theme.borderDanger : props.theme.border};
  border-radius: 6px;
  transition: 150ms border ease-out;
  &:not(:disabled) {
    &:hover,
    &:focus,
    &:focus-within {
      border-color: ${(props) => !props.errors && props.theme.secondary};
    }
  }
  ${(props) =>
    props.disabled &&
    css`
      opacity: 50%;
      cursor: not-allowed;
    `}
`;

export const InputDesc = styled(Paragraph)`
  font-size: 0.8rem;
`;
