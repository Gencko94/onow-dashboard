import styled from 'styled-components';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { RiCoupon3Line, RiFileList3Line } from 'react-icons/ri';
import { IoPeopleOutline } from 'react-icons/io5';
import { AiOutlineBarChart } from 'react-icons/ai';
const SideNav = () => {
  const { pathname } = useLocation();
  return (
    <Container>
      <SideNavItem isActive={pathname === '/dashboard'} to="/dashboard">
        <Icon>
          <BiHomeAlt size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/dashboard'}>
          Dashboard
        </SideNavItemText>
      </SideNavItem>
      <SideNavItem isActive={pathname === '/products'} to="/products">
        <Icon>
          <BiHomeAlt size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/products'}>
          Products
        </SideNavItemText>
      </SideNavItem>
      <SideNavItem isActive={pathname === '/orders'} to="/orders">
        <Icon>
          <RiFileList3Line size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/orders'}>
          Orders
        </SideNavItemText>
      </SideNavItem>
      <SideNavItem isActive={pathname === '/customers'} to="/customers">
        <Icon>
          <IoPeopleOutline size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/customers'}>
          Customers
        </SideNavItemText>
      </SideNavItem>
      <SideNavItem isActive={pathname === '/coupons'} to="/coupons">
        <Icon>
          <RiCoupon3Line size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/coupons'}>
          Coupons
        </SideNavItemText>
      </SideNavItem>
      <SideNavItem isActive={pathname === '/reports'} to="/reports">
        <Icon>
          <AiOutlineBarChart size={20} />
        </Icon>
        <SideNavItemText isActive={pathname === '/reports'}>
          Reports
        </SideNavItemText>
      </SideNavItem>
    </Container>
  );
};

export default SideNav;
const Container = styled.div`
  flex: 1;
`;
const SideNavItem = styled(Link)<{ isActive: boolean }>`
  padding: 0.5rem 0.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;

  /* box-shadow: ${props => props.isActive && props.theme.shadow}; */
`;
const Icon = styled.span`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  /* background-color: #da312c; */
  /* color: #fff; */
`;
const SideNavItemText = styled.h6<{ isActive: boolean }>`
  margin: 0 0.5rem;
  font-size: 0.9rem;
  font-weight: ${props =>
    props.isActive ? props.theme.font.semibold : props.theme.font.regular};
`;
