import { Control, Controller, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RiHandCoinLine } from "react-icons/ri";

import styled, { css } from "styled-components";

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

  label: string;

  /**
   * 	```control``` object provided by ```useForm```.
   */
  control: Control<any>;

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

  /**
   * Default Value
   */
  defaultValue?: any;
  /**
   * unlimited
   */
  unlimited: boolean;
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

const QuantityInput = ({
  errors,
  unlimited,
  control,
  name,
  required,
  label,
  requiredMessage,
  defaultValue,

  desc,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <Container
            rtl={language === "ar"}
            error={Boolean(errors?.message)}
            unlimited={unlimited}
          >
            <label>{label}</label>
            <div className="input-container">
              <span className="icon">
                <RiHandCoinLine size={21} />
              </span>

              <input
                readOnly={unlimited}
                defaultValue={defaultValue}
                type="number"
                min={0}
                step={1}
                value={value}
                onChange={onChange}
              />
            </div>

            {desc && <p className="desc">{desc}</p>}
            <p className="error">{errors?.message}</p>
          </Container>
        );
      }}
    />
  );
};

export default QuantityInput;
const Container = styled.div<{
  rtl: boolean;
  error: boolean;
  unlimited: boolean;
}>`
  label {
    color: ${(props) => props.theme.text};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${(props) => props.theme.font.regular};
    display: block;
  }
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: ${(props) => props.theme.subtleBackground};
    color: ${(props) => props.theme.text};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.primary};
    }

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.8rem;
      width: 50px;
      color: ${(props) => props.theme.text};
      ${(props) =>
        props.unlimited &&
        css`
          background-color: ${props.theme.accent2};
        `}
    }
    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
    }
    ${(props) =>
      props.error &&
      css`
        border-color: ${props.theme.dangerRed} !important;
      `}
  }
  .unlimited {
    font-size: 0.8rem;
    margin: 0;
  }
  .error {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;
    color: ${(props) => props.theme.dangerRed};
  }
  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${(props) => props.theme.primary};
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    .input-container {
      input {
        font-size: 0.9rem;
      }
    }
  } ;
`;
