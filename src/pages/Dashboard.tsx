import styled from "styled-components";
import DashboardStatPanel from "../components/Dashboard/DashboardStatPanel/DashboardStatPanel";
import DashboardOrders from "../components/Dashboard/DashboardOrders/DashboardOrders";
import DashboardBestSeller from "../components/Dashboard/DashboardBestSeller/DashboardBestSeller";
import StoreTasks from "../components/Dashboard/StoreTasks/StoreTasks";

const Dashboard = () => {
  return (
    <Container>
      <StoreTasks />

      <DashboardStatPanel />
      <DashboardOrders />
      <DashboardBestSeller />
    </Container>
  );
};

export default Dashboard;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor, font } }) => `
  padding: 0.75rem;
  @media ${breakpoints.md}{
    gap: 1rem;
    grid-template-columns: 1fr;
    display: grid;
  }
  `
);
