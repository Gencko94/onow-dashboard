import styled from "styled-components";
import DashboardStatPanel from "../components/Dashboard/DashboardStatPanel/DashboardStatPanel";
import RealTimeOrders from "../components/Dashboard/RealTimeOrders/RealTimeOrders";
import DashboardBestSeller from "../components/Dashboard/DashboardBestSeller/DashboardBestSeller";
import StoreTasks from "../components/Dashboard/StoreTasks/StoreTasks";

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
const Container = styled.div`
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    gap: 1rem;
    grid-template-columns: 1fr;
    display: grid;
  }
`;
