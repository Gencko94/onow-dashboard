import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import Heading from "../StyledComponents/Heading";

interface IProps {
  title: string;
  desc: string;
  Icon: IconType;

  cb: () => void;
}

const SettingsCard = ({ desc, title, Icon, cb }: IProps) => {
  const { isDesktop } = useResponsive();
  return (
    <Container onClick={() => cb()}>
      <span className="icon">
        <Icon size={isDesktop ? 45 : 35} />
      </span>
      <Heading tag="h6" color="primary" mb="0.25rem">
        {title}
      </Heading>

      <p className="desc">{desc}</p>
    </Container>
  );
};

export default SettingsCard;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;
  transition: all 150ms ease;
  .icon {
    margin-bottom: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.subHeading};
  }

  p.desc {
    font-size: 0.8rem;
    color: ${(props) => props.theme.subHeading};
    font-weight: ${(props) => props.theme.font.regular};
    text-align: center;
  }
  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
    transform: translateY(-2px);
  }
`;
