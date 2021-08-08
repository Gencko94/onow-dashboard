import { useContext, useEffect, useMemo, useRef, useState } from "react";

import cx from "classnames";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";

import Ripple from "./Ripple";
import Color from "color";
import { up } from "../../utils/themes";
import { IconType } from "react-icons/lib";

interface IProps {
  Icon: IconType;
  iconSize?: number;
  /**
   * ```border-radius``` will be set to 50%
   */
  circle?: boolean;
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
   * Button Size
   */
  size?: "lg" | "md" | "sm" | "xs";
  /**
   * Button Size
   */
  appearance?: "default" | "ghost";
}

const IconButton: React.FC<IProps> = ({
  onClick,

  size = "md",
  color = "default",

  margin = "0",
  textColor: buttonTextColor = "auto",
  noRipple = false,
  hoverBg,
  hoverColor,
  Icon,
  iconSize = 20,
  disabled,
  circle = false,

  appearance = "default",
  children,
}) => {
  /* Capture the dimensions of the button before the loading happens
  so it doesn’t change size when showing the loader */
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLButtonElement | null>(null);

  const { currentTheme } = useContext(ThemeContext);
  const buttonColor = useMemo(() => {
    switch (color) {
      case "default":
        return "transparent";
      case "blue":
        return currentTheme.blue;
      case "danger":
        return currentTheme.dangerRed;
      case "primary":
        return currentTheme.primary;
      case "green":
        return currentTheme.green;
    }
  }, [
    color,
    currentTheme.blue,
    currentTheme.dangerRed,
    currentTheme.primary,
    currentTheme.green,
  ]);

  const hover = useMemo(() => {
    // return Color(buttonColor).lighten(0.1).hex();
    return currentTheme.accent1;
  }, [buttonColor]);

  const textColor = useMemo(() => {
    if (appearance === "ghost") return buttonColor;
    // if (appearance === "default")
    //   return buttonTextColor === "primary"
    //     ? currentTheme.textPrimary
    //     : buttonTextColor === "primaryContrast"
    //     ? currentTheme.textPrimaryContrast
    //     : "#fff";
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
      buttonColor={buttonColor}
      color={textColor}
      onClick={onClick}
      type="button"
      hoverBg={hoverBg ?? hover}
      hoverColor={hoverColor ?? hoverTextColor}
      disabled={disabled}
      circle={circle}
      className={cx(
        "icon-btn",
        { [`icon-btn-${size}-${appearance}`]: true },
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
      <Icon size={iconSize} />
      {!noRipple && (
        <span className="ripple-wrapper">
          <Ripple />
        </span>
      )}
      {children}
    </ButtonWrapper>
  );
};

export default IconButton;
export const ButtonWrapper = styled.button<{
  color: string;
  buttonColor: string;
  circle: boolean;
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

    margin,
    hoverBg,
    hoverColor,
    appearance,
    circle,

    disabled,
    uppercase,
  }) => `
  background: ${appearance === "ghost" ? "transparent" : buttonColor};
  margin:${margin};
  text-transform:${uppercase && "uppercase"};
  position: relative;
  overflow:hidden;
  border-radius:${circle ? "50%" : "6px"};
  border-color:${buttonColor};
  color: ${color};
  &:hover {
    background:${appearance === "ghost" ? "transparent" : hoverBg};
    color: ${hoverColor};
  };
  .loading {
    animation: spinner 2s infinite linear forwards;
  }
  
  ${disabled && "background: #a7a2a2 !important; color: #fff !important;"};
  // ${up(breakpoints.md)}{

  // }
    `
);
