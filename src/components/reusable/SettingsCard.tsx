import { IconType } from "react-icons/lib";
import styled from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import Heading from "../StyledComponents/Heading";
import Spacer from "./Spacer";

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
        <Icon size={isDesktop ? 40 : 30} />
      </span>
      <Spacer size={15} />
      <Heading tag="h3" type="small-title" style={{ textAlign: "center" }}>
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
  background-color: ${(props) => props.theme.subtleBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;
  transition: all 150ms ease;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.textAlt};
  }

  p.desc {
    font-size: 0.8rem;
    color: ${(props) => props.theme.textAlt};
    font-weight: ${(props) => props.theme.font.regular};
    text-align: center;
  }
  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
    transform: translateY(-2px);
  }
`;
