import styled from 'styled-components';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiFillSetting } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { CgMenu } from 'react-icons/cg';
import useResponsive from '../../../hooks/useResponsive';
interface IProps {
  handleToggleDrawer: () => void;
}
const NavIconsDesktop = ({ handleToggleDrawer }: IProps) => {
  const { i18n } = useTranslation();
  const { isDesktop } = useResponsive();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Container>
      {!isDesktop && (
        <button onClick={() => handleToggleDrawer()} className="icon">
          <CgMenu size={22} />
        </button>
      )}
      <button className="icon">
        <IoMdNotificationsOutline size={22} />
      </button>
      <button className="icon">
        <AiFillSetting size={22} />
      </button>
      {i18n.language === 'en' && (
        <button
          className="icon"
          onClick={() => {
            changeLanguage('ar');
          }}
        >
          عربي
        </button>
      )}
      {i18n.language === 'ar' && (
        <button
          onClick={() => {
            changeLanguage('en');
          }}
        >
          En
        </button>
      )}
      <NewProjectButton>New Project</NewProjectButton>
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
  @media ${breakpoints.md}{
    button {
      margin: 0 0.5rem;

    }
  }
  `
);

const NewProjectButton = styled.button`
  background: linear-gradient(90deg, #fe0488, #f78f21);
  border-radius: 7px;
  padding: 0.5rem;
  color: #fff;
`;
