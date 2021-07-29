import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import { up } from "../../utils/themes";
interface BaseInput {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors: FieldError | undefined;
  /**
   * 	Input's name being registered.
   */
  name: string;
  /**
   * 	The icon to show.
   */
  Icon: IconType;
  /**
   * 	The label of the input.
   */
  label: string;
  /**
   * 	```register``` object provided by ```useForm```.
   */
  register: UseFormRegister<any>;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;
  /**
   * 	Providing this property will make the input of ```type='number'```.
   */

  /**
   * Minimum Value of the input.
   *
   * Required when input ```type``` is ```number```.
   */
  min: number;
  max?: number;
  /**
   * Default Value
   */
  defaultValue?: any;
}
interface RequiredInput extends BaseInput {
  /**
   * 	Optional. Marks the input as ```required```.
   */
  required: boolean;
  /**
   * The Message text to show when the field is ```required```.
   *
   * Required when ```required``` is provided.
   */
  requiredMessage: string;
}
interface NotRequiredInput extends BaseInput {
  required?: never;
  requiredMessage?: never;
}

type IProps = RequiredInput | NotRequiredInput;

const IconedNumberInput = ({
  errors,
  register,
  Icon,
  name,
  required,
  label,
  requiredMessage,
  defaultValue,
  min,
  max,
  desc,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { isDesktop } = useResponsive();
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      <label>{label}</label>
      <div className="input-container">
        <span className="icon">
          <Icon size={isDesktop ? 21 : 19} />
        </span>

        <input
          defaultValue={defaultValue}
          type="number"
          min={min}
          max={max!}
          step="any"
          {...register(name, {
            required: required ? requiredMessage : false,
            min: {
              value: min!,
              message: "Only Positive",
            },
          })}
        />
      </div>
      {desc && <p className="desc">{desc}</p>}
      <p className="error">{errors?.message}</p>
    </Container>
  );
};

export default IconedNumberInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      subHeading,
      headingColor,
      border,
      accent1,
      mainColor,
      borderHovered,
      dangerRed,
    },
    error,
    rtl,
  }) => `
  label {
    color: ${headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${font.regular};
    display: block;
  };
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: #fff;
    color: ${headingColor};
    border: ${border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${mainColor};
      
    };

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.8rem;
      width: 50px;
    }
    &:hover,
    &:focus-within {
      border-color: ${borderHovered};
      background:${accent1};
    };
    ${
      error &&
      css`
        border-color: ${(props) => props.theme.dangerRed} !important;
      `
    }
  };
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${dangerRed};
  };
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    /* color: #7c7c7c; */
    color: ${mainColor};
  };
  ${up(breakpoints.md)}{
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    };
    .input-container{
      
      input {
        font-size: 0.9rem;
      }
    }

  };

  };
`
);
