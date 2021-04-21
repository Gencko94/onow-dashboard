import React, { Suspense } from 'react';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loading from '../../utils/Loading';

const LayoutDesktop: React.FC = ({ children }) => {
  console.log(children);
  return (
    <ContentContainer>
      <Sidebar />
      <Content>
        <DesktopNavbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Content>
    </ContentContainer>
  );
};

export default LayoutDesktop;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;
const Content = styled.div`
  padding: 0 0.5rem;
  max-width: calc(100vw - 259px);
`;
