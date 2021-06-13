import { IconType } from "react-icons/lib";
import styled, { css } from "styled-components";

interface IProps {
  /**
   * ```onClick``` handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Button Text
   */
  text: string;
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
  bg: "primary" | "danger" | "blue" | "green" | string;
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
}: IProps) => {
  return (
    <ButtonWrapper
      margin={margin}
      withTransition={withTransition}
      bg={bg}
      padding={padding}
      color={color}
      onClick={onClick}
      type={type}
    >
      {Icon && (
        <span className="icon">
          <Icon size={iconSize} />
        </span>
      )}
      <p className="text">{text}</p>
    </ButtonWrapper>
  );
};

export default Button;
export const ButtonWrapper = styled.button<{
  padding: string;
  color: string;
  bg: "primary" | "danger" | "blue" | "green" | string;
  withTransition?: boolean;
  margin: string;
}>(
  ({
    theme: { breakpoints, green, shadow, mainColor, dangerRed },
    padding,
    color,
    bg,
    withTransition,
    margin,
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
          : bg
      };
      box-shadow: ${shadow};
      display: flex;
      margin:${margin};
      justify-content:center;
      align-items: center;
      border-radius: 6px;
      padding: ${padding};
      position: relative;
      color: ${color};
      transition:transform 75ms ease;
      .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        p {
            font-size:0.9rem;
            margin: 0 0.25rem;
        }
       
        ${
          withTransition &&
          css`
            transition: transform 75ms ease;
            &:hover {
              transform: translateY(-2px);
            }
          `
        }
      
      `
);
