import { useState } from "react";

import ReportsTabs from "../components/Reports/ReportsTabs";
import Spacer from "../components/reusable/Spacer";
import Flex from "../components/StyledComponents/Flex";
import Heading from "../components/StyledComponents/Heading";
import OverviewReports from "./Reports/OverviewReports";
import SalesReports from "./Reports/SalesReports";

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <Flex margin="1rem 0">
        <Heading tag="h2" type="large-title">
          Reports
        </Heading>
      </Flex>
      <ReportsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Spacer size={40} />
      {activeTab === 0 && <OverviewReports />}
      {activeTab === 1 && <SalesReports />}
    </div>
  );
};

export default Reports;
