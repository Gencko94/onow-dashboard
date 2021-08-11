import { IconType } from "react-icons/lib";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  title: string;
  desc: string;
  image: string;
  target: string;
  btnText: string;
}

const StoreTaskCard = ({ desc, title, image, target, btnText }: IProps) => {
  const history = useHistory();
  return (
    <Container>
      <img src={image} alt="title" className="img" />

      <p className="title">{title}</p>
      <p className="desc">{desc}</p>
      <button onClick={() => history.push(target)}>{btnText}</button>
    </Container>
  );
};

export default StoreTaskCard;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  transition: all 150ms ease;
  img {
    margin-bottom: 0.9rem;
    display: flex;
  }
  p.title {
    font-size: 1.1rem;
    font-weight: ${(props) => props.theme.font.semibold};
  }
  p.desc {
    font-size: 0.8rem;
    color: ${(props) => props.theme.textAlt};
    font-weight: ${(props) => props.theme.font.light};
    text-align: center;
    margin-bottom: 1rem;
  }
  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
    transform: translateY(-2px);
  }
  button {
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.9rem;
    box-shadow: ${(props) => props.theme.shadow};
    transition: background 200ms ease;

    color: #fff;
  }
`;
