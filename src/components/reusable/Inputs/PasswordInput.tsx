import { forwardRef, useState } from "react";
import { DeepMap, FieldError, get } from "react-hook-form";

import { CgPassword } from "react-icons/cg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import InputErrorMessage from "../InputErrorMessage";
import { InputLabel } from "../InputLabel/InputLabel";
import { BaseInput } from "../Input/BaseInput";

import { InputAdornment } from "../Input/InputAdornment";
import { InputDesc, InputWrapper } from "../Input/Input";
interface BaseInputProps extends React.ComponentPropsWithoutRef<"input"> {
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

const PasswordInput = forwardRef<HTMLDivElement, BaseInputProps>(
  ({ label, desc, errors, ...delegated }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      if (showPassword) {
        setShowPassword(false);
      } else {
        setShowPassword(true);
      }
    };
    return (
      <div>
        {label && (
          <InputLabel htmlFor={delegated.id || "password"}>{label}</InputLabel>
        )}
        <InputWrapper
          data-testid="input-wrapper"
          ref={ref}
          disabled={delegated.disabled}
          errors={typeof get(errors, delegated.name as string) !== "undefined"}
        >
          <InputAdornment data-testid="start-adornment">
            <CgPassword />
          </InputAdornment>

          <BaseInput
            type={showPassword ? "text" : "password"}
            id={delegated.id || "password"}
            {...delegated}
          />

          <InputAdornment
            onClick={() => handleShowPassword()}
            data-testid="end-adornment"
          >
            {showPassword ? (
              <MdVisibilityOff size={21} />
            ) : (
              <MdVisibility size={21} />
            )}
          </InputAdornment>
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

export default PasswordInput;
