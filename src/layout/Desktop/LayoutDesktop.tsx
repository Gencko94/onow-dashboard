import React from 'react';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const LayoutDesktop: React.FC = ({ children }) => {
  return (
    <ContentContainer>
      <Sidebar />
      <Content>
        <DesktopNavbar />
        {children}
      </Content>
    </ContentContainer>
  );
};

export default LayoutDesktop;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 250px calc(100vw - 250px);
  min-height: 100vh;
`;
const Content = styled.div`
  padding: 0 0.5rem;
`;
