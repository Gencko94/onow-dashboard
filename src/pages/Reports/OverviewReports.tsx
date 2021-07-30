import OverviewReportCard from "../../components/Reports/OverviewReports/OverviewReportCard";
import Grid from "../../components/StyledComponents/Grid";

const OverviewReports = () => {
  return (
    <div>
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <OverviewReportCard />
        <OverviewReportCard />
        <OverviewReportCard />
      </Grid>
    </div>
  );
};

export default OverviewReports;
