import styled from "styled-components";
interface IProps {
  /**
   * Specifies the button's text.
   */
  title: string;
  /**
   * ```onClick``` handler
   */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The ```type``` of the button.
   */
  type?: "submit" | "button";
}
const BlueButton = ({ title, onClick, type = "button" }: IProps) => {
  return (
    <Button type={type} onClick={onClick}>
      <p>{title}</p>
    </Button>
  );
};

export default BlueButton;

const Button = styled.button(
  ({ theme: { breakpoints, shadow } }) => `
    background-color: #2d88ff;
    box-shadow: ${shadow};
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    position: relative;
    color: #fff;
    transition:transform 75ms ease;
   
    p {
    
      margin: 0 0.25rem;
    }
    &:hover {
      transform:translateY(-2px);
    }
    `
);
