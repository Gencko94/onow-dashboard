import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { CgMenu } from "react-icons/cg";
import useResponsive from "../../../hooks/useResponsive";
import { useContext } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import Heading from "../../StyledComponents/Heading";
import { up } from "../../../utils/themes";
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
        <Heading tag="h6" color="primary">
          Maintenance Mode On
        </Heading>
      )}
      {/* {!isDesktop && ( */}
      <button onClick={() => handleToggleDrawer()} className="icon">
        <CgMenu size={22} />
      </button>
      {/* )} */}
      {/* <button className="icon">
        <IoMdNotificationsOutline size={22} />
      </button> */}

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
const Container = styled.div(
  ({ theme: { breakpoints, iconColor } }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .icon {
    color: ${iconColor};
  }
  ${up(breakpoints.md)}{
    button {
      margin: 0 0.5rem;

    }
  }
  `
);
