import styled from "styled-components";
import { useLocation } from "react-router-dom";

import {
  FcAdvertising,
  FcBullish,
  FcConferenceCall,
  FcGenealogy,
  FcHome,
  FcRules,
  FcSupport,
  FcViewDetails,
} from "react-icons/fc";
import canVisitPage from "../../../utils/canVisitPage";
import React, { useContext, useMemo } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import SideNavItem from "./SideNavItem";
import { up } from "../../../utils/themes";
import Spacer from "../../reusable/Spacer";
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
    ];
  }, []);
  return (
    <Container>
      {items.map((item, i) => {
        // if (
        //   canVisitPage({
        //     permissions: user?.permissions,
        //     path: "/customers",
        //     role: user?.roles,
        //   })
        // )
        return (
          <React.Fragment key={item.target}>
            <SideNavItem
              key={item.target}
              Icon={item.icon}
              active={pathname.includes(item.target)}
              target={item.target}
              title={item.title}
            />
            {i !== items.length - 1 && <Spacer size={6} />}
          </React.Fragment>
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
  ${up(breakpoints.md)}{
    height: calc(100vh - 288px);
  }
  
  `
);
