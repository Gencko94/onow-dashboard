import styled from 'styled-components';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
const ProjectSwitcher = () => {
  return (
    <Container>
      <Project>
        <ProjectLogo src="/images/storeLogo.png" />
        <ProjectNameContainer>
          <ProjectName>Antika</ProjectName>
          <ProjectStatus>https://antikakw.com</ProjectStatus>
        </ProjectNameContainer>
      </Project>
      <Icon>
        <HiOutlineSwitchVertical size={22} />
      </Icon>
    </Container>
  );
};

export default ProjectSwitcher;
const Container = styled.div`
  background: linear-gradient(90deg, #fe0488, #f78f21);
  color: #fff;
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
const Project = styled.div`
  display: flex;
  align-items: center;
`;
const ProjectNameContainer = styled.div`
  /* display: flex; */
  align-items: center;
  margin: 0 0.5rem;
`;
const ProjectName = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
`;
const ProjectStatus = styled.p`
  font-size: 0.7rem;
  /* color: #d61010; */
  font-weight: ${props => props.theme.font.regular};
`;
const ProjectLogo = styled.img`
  border-radius: 50%;
  max-height: 40px;
`;
