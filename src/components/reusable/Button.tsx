import { ImSpinner2 } from "react-icons/im";
import { IconType } from "react-icons/lib";
import styled, { css } from "styled-components";
import Ripple from "./Ripple";

interface IProps {
  /**
   * isLoading boolean , Renders a loading state.
   */
  isLoading?: boolean;
  /**
   * Button Disabled
   */
  disabled?: boolean;
  /**
   * ```onClick``` handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Button Text
   */
  text: string;
  /**
   * Button Text Size . default is 1rem
   */
  textSize?: string;
  /**
   * Icon
   */
  Icon?: IconType;
  /**
   * Icon size, defaults to 30
   */
  iconSize?: number;
  /**
   * Button ```padding```
   */
  padding: string;
  /**
   * Button Background color , There are presets but you can pass customer hex value
   */
  bg: "primary" | "danger" | "blue" | "green" | "white" | string;
  /**
   * Button Text color , defaults to White.
   */
  color?: string;
  /**
   * if ```true``` button will be transitioned up
   */
  withTransition?: boolean;
  /**
   * button ```type```
   */
  type?: "submit" | "button";
  /**
   * button ```margin```
   */
  margin?: string;

  /**
   * Button With Ripple Effect.
   */
  withRipple?: boolean;
  /**
   * On Hover background color
   */
  hoverBg?: string;
  /**
   * On Hover text color
   */
  hoverColor?: string;
  /**
   * button shadow
   */
  shadow?: boolean;
  /**
   * With Border
   */
  border?: boolean;
  /**
   * button Width
   */
  width?: string;
}

const Button = ({
  onClick,
  bg,
  padding,
  type = "button",
  text,
  Icon,
  color = "#fff",
  iconSize = 30,
  withTransition,
  margin = "none",
  withRipple,
  textSize = "1rem",
  hoverBg,
  hoverColor,
  shadow,
  border,
  isLoading,
  disabled,
  width,
}: IProps) => {
  return (
    <ButtonWrapper
      textSize={textSize}
      margin={margin}
      withTransition={withTransition}
      bg={bg}
      padding={padding}
      color={color}
      onClick={onClick}
      type={type}
      hoverBg={hoverBg}
      hoverColor={hoverColor}
      shadow={shadow}
      border={border}
      disabled={disabled}
      width={width}
    >
      {!isLoading && Icon && (
        <span className="icon">
          <Icon size={iconSize} />
        </span>
      )}
      {isLoading && (
        <span className="loading">
          <ImSpinner2 className="loading" />
        </span>
      )}
      {!isLoading && <p className="text">{text}</p>}
      {withRipple && <Ripple />}
    </ButtonWrapper>
  );
};

export default Button;
export const ButtonWrapper = styled.button<{
  padding: string;
  color: string;
  bg: "primary" | "danger" | "blue" | "green" | "white" | string;
  withTransition?: boolean;
  margin: string;
  textSize: string;
  hoverBg?: string;
  hoverColor?: string;
  shadow?: boolean;
  border?: boolean;
  width?: string;
}>(
  ({
    theme: {
      breakpoints,
      green,
      shadow,
      mainColor,
      dangerRed,
      border: themeBorder,
    },
    padding,
    color,
    bg,
    withTransition,
    margin,
    textSize,
    hoverBg,
    hoverColor,
    border,
    shadow: boxShadow,
    disabled,
    width,
  }) => `
      background-color: ${
        bg === "primary"
          ? mainColor
          : bg === "blue"
          ? "#2e87fc"
          : bg === "danger"
          ? dangerRed
          : bg === "green"
          ? green
          : bg === "white"
          ? "#fff"
          : bg
      };
      width:${width};
      box-shadow: ${boxShadow && shadow};
      display: flex;
      margin:${margin};
      justify-content:center;
      align-items: center;
      border-radius: 6px;
      padding: ${padding};
      position: relative;
      overflow:hidden;
      color: ${color};
      border:${border && themeBorder};
      transition: all 100ms ease;
     .loading {
      animation: spinner 2s infinite linear forwards;
     };
    @keyframes spinner {
      
      100% {
        transform : rotate(360deg);
      }
    }
     
      .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
            font-size:${textSize};
            margin: 0 0.25rem;
        }
        &:hover {
          background-color:${hoverBg};
          color: ${hoverColor};
        }
        
        ${
          withTransition &&
          css`
            &:hover {
              transform: translateY(-2px);
            }
          `
        }
        ${
          disabled &&
          css`
            background-color: #a7a2a2;
            color: #fff;
          `
        }
      
      `
);
