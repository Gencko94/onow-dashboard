import styled from "styled-components";
import DashboardStatPanel from "../components/Dashboard/DashboardStatPanel/DashboardStatPanel";
import RealTimeOrders from "../components/Dashboard/RealTimeOrders/RealTimeOrders";
import DashboardBestSeller from "../components/Dashboard/DashboardBestSeller/DashboardBestSeller";
import StoreTasks from "../components/Dashboard/StoreTasks/StoreTasks";
import { up } from "../utils/themes";

const Dashboard = () => {
  return (
    <Container>
      {/* <StoreTasks /> */}

      <DashboardStatPanel />
      <RealTimeOrders />
      {/* <DashboardBestSeller /> */}
    </Container>
  );
};

export default Dashboard;
const Container = styled.div(
  ({ theme: { breakpoints, headingColor, font } }) => `
  
  ${up(breakpoints.md)}{
    gap: 1rem;
    grid-template-columns: 1fr;
    display: grid;
  }
  `
);
