import styled from "styled-components";
import DashboardStatPanel from "../components/Dashboard/DashboardStatPanel/DashboardStatPanel";
import RealTimeOrders from "../components/Dashboard/RealTimeOrders/RealTimeOrders";
import DashboardTrendingProducts from "../components/Dashboard/DashboardTrendingProducts/DashboardTrendingProducts";
import StoreTasks from "../components/Dashboard/StoreTasks/StoreTasks";

const Dashboard = () => {
  return (
    <Container>
      {/* <StoreTasks /> */}

      <DashboardStatPanel />
      {/* <RealTimeOrders /> */}
      <DashboardTrendingProducts />
    </Container>
  );
};

export default Dashboard;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor, font } }) => `
  
  @media ${breakpoints.md}{
    gap: 1rem;
    grid-template-columns: 1fr;
    display: grid;
  }
  `
);
