import { useContext, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";

import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import useResponsive from "../../hooks/useResponsive";
import Ripple from "./Ripple";
import Color from "color";

import React from "react";
import UnstyledButton from "./Buttons/UnstyledButton";

interface IProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * isLoading boolean , Renders a loading state.
   */
  isLoading?: boolean;

  /**
   * Button Background color , There are presets but you can pass custom hex value
   */
  color?: "default" | "primary" | "danger" | "blue" | "green";

  /**
   * if ```true``` button will be transitioned up
   */
  withTransition?: boolean;
  /**
   * button ```margin```
   */
  margin?: string;

  /**
   * Button With Ripple Effect.
   */
  noRipple?: boolean;

  /**
   * Text Transform uppercase
   */
  uppercase?: boolean;
  /**
   * Button Size
   */
  size?: "lg" | "md" | "sm" | "xs";
  /**
   * Button Appearance
   */
  appearance?: "default" | "ghost" | "toggle";
  active?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IProps>(
  (
    {
      type = "button",
      size = "md",
      color = "default",
      withTransition,
      margin = "0",
      noRipple = false,
      isLoading,
      uppercase,
      appearance = "default",
      children,
      active,
      ...props
    },
    ref
  ) => {
    /* Capture the dimensions of the button before the loading happens
  so it doesn’t change size when showing the loader */
    // const [width, setWidth] = useState(0);
    // const [height, setHeight] = useState(0);
    // const ref = useRef<HTMLButtonElement | null>(null);
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

    const textColor = useMemo(() => {
      const darkenedColor = Color(buttonColor).darken(0.35).hex();

      if (Color(darkenedColor).isDark()) {
        return "#fff";
      } else {
        return "#252525";
      }
    }, [buttonColor]);

    // useEffect(
    //   () => {
    //     if (ref.current && ref.current.getBoundingClientRect().width) {
    //       setWidth(ref.current.getBoundingClientRect().width);
    //     }
    //     if (ref.current && ref.current.getBoundingClientRect().height) {
    //       setHeight(ref.current.getBoundingClientRect().height);
    //     }
    //   },
    //   // children are a dep so dimensions are updated if initial contents change
    //   [children]
    // );

    let Component: any;
    if (appearance === "ghost") {
      if (size === "xs") Component = GhostButtonXs;
      else if (size === "sm") Component = GhostButtonSm;
      else if (size === "md") Component = GhostButtonMd;
      else if (size === "lg") Component = GhostButtonLg;
    } else if (appearance === "default") {
      if (size === "xs") Component = DefaultButtonXs;
      else if (size === "sm") Component = DefaultButtonSm;
      else if (size === "md") Component = DefaultButtonMd;
      else if (size === "lg") Component = DefaultButtonLg;
    } else if (appearance === "toggle") {
      if (size === "xs") Component = ToggleButtonXs;
      else if (size === "sm") Component = ToggleButtonSm;
      else if (size === "md") Component = ToggleButtonMd;
      else if (size === "lg") Component = ToggleButtonLg;
    }
    return (
      <Component
        background={buttonColor}
        textColor={textColor}
        withTransition={withTransition}
        active={active}
        type={type}
        // style={
        //   width && height
        //     ? {
        //         width: `${width}px`,
        //         height: `${height}px`,
        //       }
        //     : {}
        // }
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="loading" data-testid="btn-loading">
            <ImSpinner2 size={isDesktop ? 15 : 18} className="loading" />
          </span>
        ) : (
          children
        )}
        {!noRipple && !props.disabled && (
          <span className="ripple-wrapper">
            <Ripple />
          </span>
        )}
      </Component>
    );
  }
);

export default Button;

const BaseButton = styled(UnstyledButton)`
  border-radius: 6px;
  font-weight: ${(props) => props.theme.font.semibold};
  transition: transform 250ms;
  text-transform: uppercase;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    filter: hue-rotate(4deg) saturate(120%) brightness(120%);
  }
  /* &:not(:disabled):active {
    transform: scale(0.95);
    transition: transform 32ms;
  } */
`;

// Default Button
const DefaultButton = styled(BaseButton)<{
  background: string;
  textColor: string;
  withTransition: boolean;
}>`
  background: ${(props) => props.background};
  color: ${(props) => props.textColor};
  &:not(:disabled) {
    ${(props) =>
      props.withTransition && "&:hover {transform: translateY(-2px);}"};
  }
`;

// Ghost Button
const GhostButton = styled(BaseButton)<{
  background: string;
}>`
  border: 1px solid ${(props) => props.background};
  background: transparent;
  color: ${(props) => props.background};
`;

// Toggle Button

const ToggleButton = styled(GhostButton)<{ active?: boolean }>`
  background: ${(props) => (props.active ? props.background : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "inherit")};
`;
const GhostButtonXs = styled(GhostButton)`
  padding: 1px 7px;
  font-size: 11px;
`;
const GhostButtonSm = styled(GhostButton)`
  padding: 4px 9px;
  font-size: 13px;
`;
const GhostButtonMd = styled(GhostButton)`
  padding: 7px 11px;
  font-size: 14px;
`;
const GhostButtonLg = styled(GhostButton)`
  padding: 9px 15px;
  font-size: 15px;
`;
const DefaultButtonXs = styled(DefaultButton)`
  padding: 2px 8px;
  font-size: 12px;
`;
const DefaultButtonSm = styled(DefaultButton)`
  padding: 5px 10px;
  font-size: 14px;
`;
const DefaultButtonMd = styled(DefaultButton)`
  padding: 8px 12px;
  font-size: 15px;
`;
const DefaultButtonLg = styled(DefaultButton)`
  padding: 10px 16px;
  font-size: 16px;
`;
const ToggleButtonXs = styled(ToggleButton)`
  padding: 1px 7px;
  font-size: 11px;
`;
const ToggleButtonSm = styled(ToggleButton)`
  padding: 4px 9px;
  font-size: 13px;
`;
const ToggleButtonMd = styled(ToggleButton)`
  padding: 7px 11px;
  font-size: 14px;
`;
const ToggleButtonLg = styled(ToggleButton)`
  padding: 9px 15px;
  font-size: 15px;
`;
