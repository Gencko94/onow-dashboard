import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

import {
  FcAdvertising,
  FcBullish,
  FcConferenceCall,
  FcGenealogy,
  FcHome,
  FcRules,
  FcSelfie,
  FcShop,
  FcSupport,
  FcViewDetails,
} from "react-icons/fc";
import canVisitPage from "../../../utils/canVisitPage";
import { useContext } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
// import { useState } from "react";
const SideNav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthProvider);
  // const [openedItem, setOpenedItem] = useState<number | null>(null);
  return (
    <Container>
      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/dashboard")} to="/dashboard">
          <span className="icon">
            <FcHome size={20} />
          </span>
          <h6>Dashboard</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/products")} to="/products">
          <span className="icon">
            <FcViewDetails size={20} />
          </span>
          <h6>Products</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem>
        <SideNavLink
          isActive={pathname.includes("/categories")}
          to="/categories"
        >
          <span className="icon">
            <FcGenealogy size={20} />
          </span>
          <h6>Categories</h6>
        </SideNavLink>
      </SideNavItem>
      {/* <SideNavItem>
        <SideNavLink isActive={pathname.includes("/brands")} to="/brands">
          <span className="icon">
            <FcShop size={20} />
          </span>
          <h6>Brands</h6>
        </SideNavLink>
      </SideNavItem> */}
      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/orders")} to="/orders">
          <span className="icon">
            <FcRules size={20} />
          </span>
          <h6>Orders</h6>
        </SideNavLink>
      </SideNavItem>

      {canVisitPage({
        permissions: user?.permissions,
        path: "/customers",
        role: user?.role,
      }) && (
        <SideNavItem>
          <SideNavLink
            isActive={pathname.includes("/customers")}
            to="/customers"
          >
            <span className="icon">
              <FcConferenceCall size={20} />
            </span>
            <h6>Customers</h6>
          </SideNavLink>
        </SideNavItem>
      )}
      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/settings")} to="/settings">
          <span className="icon">
            <FcSupport size={20} />
          </span>
          <h6>Settings</h6>
        </SideNavLink>
      </SideNavItem>

      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/coupons")} to="/coupons">
          <span className="icon">
            <FcAdvertising size={20} />
          </span>
          <h6>Coupons</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem>
        <SideNavLink isActive={pathname.includes("/reports")} to="/reports">
          <span className="icon">
            <FcBullish size={20} />
          </span>
          <h6>Reports</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem>
        <SideNavLink
          isActive={pathname === "/website-layout"}
          to="/website-layout"
        >
          <span className="icon">
            <FcSelfie size={20} />
          </span>
          <h6>Website Layout</h6>
        </SideNavLink>
      </SideNavItem>
    </Container>
  );
};

export default SideNav;
const Container = styled.ul(
  ({ theme: { breakpoints } }) => `
  height: calc(100vh - 298px);
  overflow-y: auto;
  @media ${breakpoints.md} {

    height: calc(100vh - 288px);
  }
  
  `
);
const SideNavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: block;
`;
const SideNavLink = styled(Link)<{ isActive: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  display: flex;
  margin: 0 0.5rem;
  align-items: center;

  .icon {
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 5px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }
  h6 {
    margin: 0 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
  }
  ${(props) =>
    props.isActive &&
    css`
      font-weight: ${(props) => props.theme.font.semibold};
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
      .icon {
        background-color: #fff;
        color: ${(props) => props.theme.mainColor};
        box-shadow: none;
      }
    `}
`;
