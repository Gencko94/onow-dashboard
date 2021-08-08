import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import cx from "classnames";
import styled from "styled-components";
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
   * Button Background color , There are presets but you can pass custom hex value
   */
  color?: "default" | "primary" | "danger" | "blue" | "green";
  /**
   * Button Text color , defaults to White.
   */

  textColor?: "auto" | "primary" | "primaryContrast";
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
  noRipple?: boolean;
  /**
   * On Hover background color
   */
  hoverBg?: string;
  /**
   * On Hover text color
   */
  hoverColor?: string;

  /**
   * Text Transform uppercase
   */
  uppercase?: boolean;
  /**
   * Button Size
   */
  size?: "lg" | "md" | "sm" | "xs";
  /**
   * Button Size
   */
  appearance?: "default" | "ghost";
}

const Button: React.FC<IProps> = ({
  onClick,
  type = "button",
  size = "md",
  color = "default",
  withTransition,
  margin = "0",
  textColor: buttonTextColor = "auto",
  noRipple = false,
  hoverBg,
  hoverColor,
  isLoading,
  disabled,
  uppercase,
  appearance = "default",
  children,
}) => {
  /* Capture the dimensions of the button before the loading happens
  so it doesn’t change size when showing the loader */
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLButtonElement | null>(null);
  const { isDesktop } = useResponsive();
  const { currentTheme } = useContext(ThemeContext);
  const buttonColor = useMemo(() => {
    switch (color) {
      case "default":
        return "#f1f1f1";
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
    color,
    currentTheme.blue,
    currentTheme.dangerRed,
    currentTheme.primary,
    currentTheme.green,
  ]);

  const hover = useMemo(() => {
    return Color(buttonColor).darken(0.1).hex();
  }, [buttonColor]);

  const textColor = useMemo(() => {
    if (appearance === "ghost") return buttonColor;
    if (buttonTextColor === "auto") {
      const darkenedColor = Color(buttonColor).darken(0.3).hex();
      if (Color(darkenedColor).isDark()) {
        return currentTheme.textPrimaryContrast;
      } else {
        return currentTheme.textPrimary;
      }
    } else if (buttonTextColor === "primary") {
      return currentTheme.textPrimary;
    } else if (buttonTextColor === "primaryContrast") {
      return currentTheme.textPrimaryContrast;
    }
  }, [
    appearance,
    buttonColor,
    buttonTextColor,
    currentTheme.textPrimary,
    currentTheme.textPrimaryContrast,
  ]);
  const hoverTextColor = useMemo(() => {
    if (appearance === "ghost") return buttonColor;
    const darkenedColor = Color(hover).darken(0.2).hex();

    if (Color(darkenedColor).isDark()) {
      return currentTheme.textPrimaryContrast;
    } else {
      return currentTheme.textPrimary;
    }
  }, [
    appearance,
    buttonColor,
    currentTheme.textPrimary,
    currentTheme.textPrimaryContrast,
    hover,
  ]);

  useEffect(
    () => {
      if (ref.current && ref.current.getBoundingClientRect().width) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
      if (ref.current && ref.current.getBoundingClientRect().height) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    },
    // children are a dep so dimensions are updated if initial contents change
    [children]
  );
  return (
    <ButtonWrapper
      appearance={appearance}
      ref={ref}
      margin={margin}
      withTransition={withTransition}
      buttonColor={buttonColor}
      color={textColor}
      onClick={onClick}
      type={type}
      hoverBg={hoverBg ?? hover}
      hoverColor={hoverColor ?? hoverTextColor}
      disabled={isLoading || disabled}
      className={cx(
        "btn",
        { [`btn-${size}-${appearance}`]: true },
        { "btn-ghost": appearance === "ghost" }
      )}
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
    >
      {isLoading ? (
        <span className="loading">
          <ImSpinner2 size={isDesktop ? 15 : 18} className="loading" />
        </span>
      ) : (
        children
      )}

      {!noRipple && (
        <span className="ripple-wrapper">
          <Ripple />
        </span>
      )}
    </ButtonWrapper>
  );
};

export default Button;
export const ButtonWrapper = styled.button<{
  color: string;
  buttonColor: string;
  withTransition?: boolean;
  margin?: string;
  hoverBg?: string;
  hoverColor?: string;
  uppercase?: boolean;
  appearance: "default" | "ghost";
}>(
  ({
    theme: { breakpoints },
    color,
    buttonColor,
    withTransition,
    margin,
    hoverBg,
    hoverColor,
    appearance,

    disabled,
    uppercase,
  }) => `
  background: ${appearance === "ghost" ? "transparent" : buttonColor};
  margin:${margin};
  text-transform:${uppercase && "uppercase"};
  position: relative;
  border-color:${buttonColor};
  color: ${color};
  &:hover {
    background:${appearance === "ghost" ? "transparent" : hoverBg};
    color: ${hoverColor};
  };
  .loading {
    animation: spinner 2s infinite linear forwards;
  }
  ${withTransition && "&:hover {transform: translateY(-2px);}"};
  ${disabled && "background: #a7a2a2 !important; color: #fff !important;"};
  // ${up(breakpoints.md)}{

  // }
    `
);
