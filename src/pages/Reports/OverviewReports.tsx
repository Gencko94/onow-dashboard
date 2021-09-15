import styled from "styled-components";
import OrdersOverview from "../../components/Reports/OverviewReports/OrdersOverview";
import OverviewReportCard from "../../components/Reports/OverviewReports/OverviewReportCard";
import Grid from "../../components/StyledComponents/Grid";

const OverviewReports = () => {
  return (
    <div>
      <Grid columns="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <OverviewReportCard />
        <OverviewReportCard />
        <OverviewReportCard />
      </Grid>
      <OverviewGrid>
        <OrdersOverview />
      </OverviewGrid>
    </div>
  );
};

export default OverviewReports;
const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem 0;
  @media ${(props) => props.theme.breakpoints.lgAndLarger} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
