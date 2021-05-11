import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  title: string;
  desc: string;
  Icon: IconType;
  target: string;
}

const SettingsCard = ({ desc, title, Icon, target }: IProps) => {
  return (
    <Container to={target}>
      <span className="icon">
        <Icon size={45} />
      </span>
      <p className="title">{title}</p>
      <p className="desc">{desc}</p>
    </Container>
  );
};

export default SettingsCard;
const Container = styled(Link)`
  border: ${props => props.theme.border};
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  transition: all 150ms ease;
  .icon {
    margin-bottom: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.subHeading};
  }
  p.title {
    font-weight: ${props => props.theme.font.semibold};
  }
  p.desc {
    font-size: 0.8rem;
    color: ${props => props.theme.subHeading};
    font-weight: ${props => props.theme.font.light};
    text-align: center;
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow};
  }
`;
