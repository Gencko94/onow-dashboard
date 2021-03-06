import styled from "styled-components";

type IProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Chip = ({ text, onClick }: IProps) => {
  return (
    <Container type="button" onClick={onClick}>
      {text}
    </Container>
  );
};

export default Chip;
const Container = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 15px;
  transition: transform 75ms ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
