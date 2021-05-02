import styled from 'styled-components';
import DashboardStatPanel from '../components/Dashboard/DashboardStatPanel/DashboardStatPanel';
import DashboardOrders from '../components/Dashboard/DashboardOrders/DashboardOrders';

const Dashboard = () => {
  return (
    <Container>
      <DashboardStatPanel />
      <DashboardOrders />
      <DashboardOrders />
      <DashboardOrders />
      <DashboardOrders />
    </Container>
  );
};

export default Dashboard;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor, font } }) => `
  padding: 0.75rem;
  @media ${breakpoints.md}{
    gap: 0.75rem;
    grid-template-columns: 1fr;
    display: grid;
  }
  `
);
