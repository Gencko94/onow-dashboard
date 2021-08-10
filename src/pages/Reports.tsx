import { useState } from "react";
import styled from "styled-components";
import ReportsTabs from "../components/Reports/ReportsTabs";
import Flex from "../components/StyledComponents/Flex";
import Heading from "../components/StyledComponents/Heading";
import OverviewReports from "./Reports/OverviewReports";

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
      {activeTab === 0 && <OverviewReports />}
    </div>
  );
};

export default Reports;
const Container = styled.div``;
