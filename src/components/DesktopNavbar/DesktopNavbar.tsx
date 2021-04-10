import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DesktopNavbar = () => {
  const { t, i18n, ready } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return <Container>hi</Container>;
};

export default DesktopNavbar;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
