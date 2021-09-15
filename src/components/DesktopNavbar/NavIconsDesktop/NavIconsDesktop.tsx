import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { CgMenu } from "react-icons/cg";
import useResponsive from "../../../hooks/useResponsive";
import { useContext } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import Heading from "../../StyledComponents/Heading";
import DarkModeToggleContainer from "../../DarkModeToggle/DarkModeToggle";
import IconButton from "../../reusable/IconButton";
interface IProps {
  handleToggleDrawer: () => void;
}
const NavIconsDesktop = ({ handleToggleDrawer }: IProps) => {
  const { user } = useContext(AuthProvider);
  const { i18n } = useTranslation();
  const { isDesktop } = useResponsive();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Container>
      {user?.store?.maintenance && (
        <Heading type="small-title" tag="h6">
          Maintenance Mode On
        </Heading>
      )}

      <IconButton onClick={() => handleToggleDrawer()}>
        <CgMenu size={22} />
      </IconButton>

      <DarkModeToggleContainer />
      {i18n.language === "en" && (
        <button
          className="icon"
          onClick={() => {
            changeLanguage("ar");
          }}
        >
          عربي
        </button>
      )}
      {i18n.language === "ar" && (
        <button
          onClick={() => {
            changeLanguage("en");
          }}
        >
          En
        </button>
      )}
    </Container>
  );
};

export default NavIconsDesktop;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
