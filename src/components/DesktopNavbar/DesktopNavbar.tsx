import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import NavIconsDesktop from './NavIconsDesktop/NavIconsDesktop';
import Searchbar from './Searchbar/Searchbar';

const DesktopNavbar = () => {
  const { t, i18n, ready } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <Container>
      <Searchbar />
      <NavIconsDesktop />
    </Container>
  );
};

export default DesktopNavbar;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;
