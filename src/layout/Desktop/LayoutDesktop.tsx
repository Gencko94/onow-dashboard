import React from 'react';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const LayoutDesktop: React.FC = ({ children }) => {
  return (
    <Container>
      <ContentContainer>
        <Sidebar />
        <Content>
          <DesktopNavbar />
          {children}
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default LayoutDesktop;

const Container = styled.div`
  /* display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh; */
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;
const Content = styled.div``;
