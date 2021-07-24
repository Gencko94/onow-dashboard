import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Ripple from "../../reusable/Ripple";

interface IProps {
  Icon: IconType;
  title: string;
  active: boolean;
  target: string;
}

const SideNavItem = ({ Icon, active, title, target }: IProps) => {
  return (
    <Container>
      <SideNavLink isCurrent={active} to={target}>
        <span className="icon">
          <Icon size={20} />
        </span>
        <p>{title}</p>
        <Ripple />
      </SideNavLink>
    </Container>
  );
};

export default SideNavItem;
const Container = styled.li(
  ({ theme: { breakpoints, font } }) => `
    display:block;
    // background-color:#fff;
    
    position:relative;
    overflow:hidden;
    p {
      margin: 0 0.5rem;
      font-size: 0.9rem;
      font-weight: ${font.regular};
    };1
    @media ${breakpoints.md} {
      p {
        font-size: 0.9rem;
      }
    }
    
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
