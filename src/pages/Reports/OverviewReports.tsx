import styled from "styled-components";
import OrdersOverview from "../../components/Reports/OverviewReports/OrdersOverview";
import OverviewReportCard from "../../components/Reports/OverviewReports/OverviewReportCard";
import Grid from "../../components/StyledComponents/Grid";
import { up } from "../../utils/themes";

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
const OverviewGrid = styled.div(
  ({ theme: { breakpoints } }) => `
display:grid;
grid-template-columns:1fr;
gap:1rem;
margin:1rem 0;
${up(breakpoints.lg)}{
  
  grid-template-columns:1fr 1fr 1fr;

}

`
);
