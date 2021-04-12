import styled from 'styled-components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
const NavIconsDesktop = () => {
  return (
    <Container>
      <Icon>
        <IoMdNotificationsOutline size={25} />
      </Icon>
      <Icon>
        <IoSettingsOutline size={25} />
      </Icon>
      <NewProjectButton>New Project</NewProjectButton>
    </Container>
  );
};

export default NavIconsDesktop;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
`;
const NewProjectButton = styled.button`
  background: linear-gradient(90deg, #fe0488, #f78f21);
  border-radius: 7px;
  padding: 0.5rem;
  color: #fff;
`;
