import styled from 'styled-components';
import DashboardCenter from '../components/Dashboard/DashboardCenter/DashboardCenter';
import DashboardSide from '../components/Dashboard/DashboardSide/DashboardSide';

const Dashboard = () => {
  return (
    <Container>
      <DashboardCenter />
      <DashboardSide />
    </Container>
  );
};

export default Dashboard;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 0.75rem;
  padding: 0.75rem;
`;
