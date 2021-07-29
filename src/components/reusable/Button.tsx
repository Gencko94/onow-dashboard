import { useContext, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IconType } from "react-icons/lib";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import useResponsive from "../../hooks/useResponsive";
import Ripple from "./Ripple";
import Color from "color";
import { up } from "../../utils/themes";

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
  bg: "primary" | "danger" | "blue" | "green" | "transparent";
  /**
   * Button Text color , defaults to White.
   */
  color?: "primary" | string;
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
  /**
   * Text Transform uppercase
   */
  uppercase?: boolean;
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
  textSize = "0.9rem",
  hoverBg,
  hoverColor,
  shadow,
  border,
  isLoading,
  disabled,
  width,
  uppercase,
}: IProps) => {
  const { isDesktop } = useResponsive();
  const { currentTheme } = useContext(ThemeContext);
  const background = useMemo(() => {
    switch (bg) {
      case "blue":
        return currentTheme.blue;
      case "danger":
        return currentTheme.dangerRed;
      case "primary":
        return currentTheme.primary;
      case "green":
        return currentTheme.green;
      default:
        return "rgba(255,255,255,0)";
    }
  }, [
    bg,
    currentTheme.blue,
    currentTheme.dangerRed,
    currentTheme.primary,
    currentTheme.green,
  ]);
  const hover = useMemo(() => {
    return Color(background).darken(0.2).hex();
  }, [background]);
  const textColor = useMemo(() => {
    if (background === currentTheme.primary) {
      return currentTheme.textPrimaryContrast;
    }
    if (Color(background).isDark()) {
      return currentTheme.textPrimaryContrast;
    } else {
      return currentTheme.textPrimary;
    }
  }, [
    background,
    currentTheme.primary,
    currentTheme.textPrimary,
    currentTheme.textPrimaryContrast,
  ]);
  const hoverTextColor = useMemo(() => {
    if (Color(hoverBg).isDark()) {
      return currentTheme.textPrimaryContrast;
    } else {
      return currentTheme.textPrimary;
    }
  }, [currentTheme.textPrimary, currentTheme.textPrimaryContrast, hoverBg]);
  return (
    <ButtonWrapper
      textSize={textSize}
      margin={margin}
      withTransition={withTransition}
      bg={background}
      padding={padding}
      color={color ?? textColor}
      onClick={onClick}
      type={type}
      hoverBg={hoverBg ?? hover}
      hoverColor={hoverColor ?? hoverTextColor}
      shadow={shadow}
      border={border}
      disabled={disabled}
      width={width}
    >
      {!isLoading && Icon && (
        <span className="icon">
          <Icon size={isDesktop ? iconSize - 3 : iconSize - 5} />
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
  bg: "primary" | "danger" | "blue" | "green" | "transparent";
  withTransition?: boolean;
  margin: string;
  textSize: string;
  hoverBg?: string;
  hoverColor?: string;
  shadow?: boolean;
  border?: boolean;
  width?: string;
  uppercase?: boolean;
}>(
  ({
    theme: {
      breakpoints,
      green,
      shadow,
      mainColor,
      dangerRed,
      border: themeBorder,
      font,
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
    uppercase,
    width,
  }) => `
  background: ${bg};
      width:${width};
      box-shadow: ${boxShadow && shadow};
      display: flex;
      margin:${margin};
      justify-content:center;
      align-items: center;
      border-radius: 6px;
      padding: ${padding};
      text-transform:${uppercase && "uppercase"};
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
        font-size:${`calc(${textSize} - 0.1rem)`}; 
          margin: 0 0.25rem;
      }
      &:hover {
        background:${hoverBg};
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
          background: #a7a2a2 !important;
          color: #fff !important;
        `
      };
    ${up(breakpoints.md)}{
     p {
      font-size:${textSize};
     }
  }
    `
);
