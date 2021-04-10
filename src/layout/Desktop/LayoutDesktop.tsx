import React from 'react';
import styled from 'styled-components';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';

const LayoutDesktop: React.FC = ({ children }) => {
  return (
    <Container>
      <DesktopNavbar />

      {children}
    </Container>
  );
};

export default LayoutDesktop;

const Container = styled.div``;
