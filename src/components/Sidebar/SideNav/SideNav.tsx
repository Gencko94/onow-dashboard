import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { RiCoupon3Line, RiFileList3Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { AiFillSetting, AiOutlineBarChart } from "react-icons/ai";

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
// import { useState } from "react";
const SideNav = () => {
  const { pathname } = useLocation();
  // const [openedItem, setOpenedItem] = useState<number | null>(null);
  return (
    <Container>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 1) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(1);
      // }}
      // opened={openedItem === 1}
      >
        <SideNavLink isActive={pathname.includes("/dashboard")} to="/dashboard">
          <span className="icon">
            <FcHome size={20} />
          </span>
          <h6>Dashboard</h6>
        </SideNavLink>
        {/* <div className="submenu">
          <SubMenuLink isActive={pathname === "/dashboard"} to="/dashboard">
            Dashboard
          </SubMenuLink>
        </div> */}
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 2) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(2);
      // }}
      // opened={openedItem === 2}
      >
        <SideNavLink isActive={pathname.includes("/products")} to="/products">
          <span className="icon">
            <FcViewDetails size={20} />
          </span>
          <h6>Products</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 2) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(2);
      // }}
      // opened={openedItem === 2}
      >
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
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 2) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(2);
      // }}
      // opened={openedItem === 2}
      >
        <SideNavLink isActive={pathname.includes("/brands")} to="/brands">
          <span className="icon">
            <FcShop size={20} />
          </span>
          <h6>Brands</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 3) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(3);
      // }}
      // opened={openedItem === 3}
      >
        <SideNavLink isActive={pathname.includes("/orders")} to="/orders">
          <span className="icon">
            <FcRules size={20} />
          </span>
          <h6>Orders</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 4) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(4);
      // }}
      // opened={openedItem === 4}
      >
        <SideNavLink isActive={pathname.includes("/customers")} to="/customers">
          <span className="icon">
            <FcConferenceCall size={20} />
          </span>
          <h6>Customers</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 5) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(5);
      // }}
      // opened={openedItem === 5}
      >
        <SideNavLink isActive={pathname.includes("/settings")} to="/settings">
          <span className="icon">
            <FcSupport size={20} />
          </span>
          <h6>Settings</h6>
        </SideNavLink>
      </SideNavItem>

      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 5) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(5);
      // }}
      // opened={openedItem === 5}
      >
        <SideNavLink isActive={pathname.includes("/coupons")} to="/coupons">
          <span className="icon">
            <FcAdvertising size={20} />
          </span>
          <h6>Coupons</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 6) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(6);
      // }}
      // opened={openedItem === 6}
      >
        <SideNavLink isActive={pathname.includes("/reports")} to="/reports">
          <span className="icon">
            <FcBullish size={20} />
          </span>
          <h6>Reports</h6>
        </SideNavLink>
      </SideNavItem>
      <SideNavItem
      // onClick={() => {
      //   if (openedItem === 7) {
      //     return setOpenedItem(null);
      //   }
      //   setOpenedItem(7);
      // }}
      // opened={openedItem === 7}
      >
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
  .submenu {
    overflow: hidden;
    max-height: 0;
    transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s ease-out;
  }
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
// const SubMenuLink = styled(Link)<{ isActive: boolean }>`
//   margin: 0 1rem;
// `;
