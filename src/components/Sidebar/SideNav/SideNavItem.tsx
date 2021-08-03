import { IconType } from "react-icons/lib";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import useResponsive from "../../../hooks/useResponsive";
import Ripple from "../../reusable/Ripple";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  Icon: IconType;
  title: string;
  active: boolean;
  target: string;
}

const SideNavItem = ({ Icon, active, title, target }: IProps) => {
  const { isDesktop } = useResponsive();
  const history = useHistory();
  return (
    <Container>
      <SideNavLink isCurrent={active} to={target}>
        <span className="icon">
          <Icon size={20} />
        </span>
        <Paragraph fontSize="0.9rem" margin="0 0.5rem">
          {title}
        </Paragraph>

        <Ripple />
      </SideNavLink>
    </Container>
  );
};

export default SideNavItem;
const Container = styled.li(
  ({ theme: { breakpoints, font } }) => `
    display:block;
    position:relative;
    overflow:hidden; 
    `
);
const SideNavLink = styled(Link)<{ isCurrent: boolean }>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: background 150ms ease;
  color: ${(props) => props.theme.textPrimaryContrast};

  .icon {
    padding: 0.25rem;
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: #333;
  }
  ${(props) =>
    props.isCurrent &&
    css`
      background-color: #444;
      color: ${(props) => props.theme.mainColor};
    `};
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;
