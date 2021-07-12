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
    
    position:relative;
    overflow:hidden;
    p {
      margin: 0 0.5rem;
      font-size: 0.9rem;
      font-weight: ${font.semibold};
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
  /* border-radius: 10px; */
  display: flex;
  align-items: center;
  transition: background 150ms ease;

  .icon {
    /* box-shadow: ${(props) => props.theme.shadow}; */
    border-radius: 50%;
    padding: 0.25rem;
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
  ${(props) =>
    props.isCurrent &&
    css`
      p {
        font-weight: ${(props) => props.theme.font.bold};
      }
      color: ${(props) => props.theme.mainColor};
      /* color: #fff; */
      .icon {
        background-color: #fff;
        color: ${(props) => props.theme.mainColor};
        box-shadow: none;
      }
    `};
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;
