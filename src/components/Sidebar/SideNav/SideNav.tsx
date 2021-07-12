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
  FcSupport,
  FcViewDetails,
} from "react-icons/fc";
import canVisitPage from "../../../utils/canVisitPage";
import { useContext, useMemo } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import SideNavItem from "./SideNavItem";
// import { useState } from "react";
const SideNav = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthProvider);
  const items = useMemo(() => {
    return [
      {
        title: "Dashboard",
        icon: FcHome,
        target: "/dashboard",
      },
      {
        title: "Products",
        icon: FcViewDetails,
        target: "/products",
      },
      {
        title: "Categories",
        icon: FcGenealogy,
        target: "/categories",
      },
      {
        title: "Orders",
        icon: FcRules,
        target: "/orders",
      },
      {
        title: "Customers",
        icon: FcConferenceCall,
        target: "/customers",
      },
      {
        title: "Settings",
        icon: FcSupport,
        target: "/settings",
      },
      {
        title: "Coupons",
        icon: FcAdvertising,
        target: "/coupons",
      },
      {
        title: "Reports",
        icon: FcBullish,
        target: "/reports",
      },
      {
        title: "Website Layout",
        icon: FcSelfie,
        target: "/website-layout",
      },
    ];
  }, []);
  return (
    <Container>
      {items.map((item) => {
        if (
          canVisitPage({
            permissions: user?.permissions,
            path: "/customers",
            role: user?.roles,
          })
        )
          return (
            <SideNavItem
              key={item.target}
              Icon={item.icon}
              active={pathname.includes(item.target)}
              target={item.target}
              title={item.title}
            />
          );
      })}
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
