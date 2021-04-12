import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';
const SideUser = () => {
  return (
    <Container>
      <User>
        <UserImage src="/images/user.jpg" />
        <Username>Ahmad Zaaza</Username>
      </User>
      <Icon>
        <BiDotsVerticalRounded size={22} />
      </Icon>
    </Container>
  );
};

export default SideUser;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
`;
const Username = styled.p`
  margin: 0 0.5rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
`;
const UserImage = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  object-fit: cover;
`;
