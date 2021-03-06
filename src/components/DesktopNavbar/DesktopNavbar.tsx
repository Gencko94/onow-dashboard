import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NavIconsDesktop from "./NavIconsDesktop/NavIconsDesktop";
import Searchbar from "./Searchbar/Searchbar";

interface IProps {
  handleToggleDrawer: () => void;
}

const DesktopNavbar = ({ handleToggleDrawer }: IProps) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY > 5) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", checkScrolling);
    return () => {
      window.removeEventListener("scroll", checkScrolling);
    };
  }, []);
  return (
    <Container sticky={sticky}>
      <Searchbar />
      <NavIconsDesktop handleToggleDrawer={handleToggleDrawer} />
    </Container>
  );
};

export default DesktopNavbar;
const Container = styled.div<{ sticky: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.75rem;
  transition: box-shadow 0.25s ease-in, background-color 0.25s ease-in;
  border-radius: 12px;
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }
  ${(props) =>
    props.sticky &&
    css`
      position: sticky;
      top: 10px;
      box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.9),
        0 20px 27px 0 rgba(0, 0, 0, 0.05);
      backdrop-filter: saturate(200%) blur(30px);
      background-color: ${props.theme.stickyNav};
      z-index: 10;
    `}
`;
