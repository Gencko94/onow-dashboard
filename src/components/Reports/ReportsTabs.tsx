import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Paragraph from "../StyledComponents/Paragraph";

interface TabsProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const ReportsTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <Container>
      <Tab onClick={() => setActiveTab(0)} active={activeTab === 0}>
        <Paragraph>Overview</Paragraph>
      </Tab>
      <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
        <Paragraph>Sales</Paragraph>
      </Tab>
    </Container>
  );
};

export default ReportsTabs;
const Container = styled.div(
  ({ theme: { breakpoints, border } }) => `
  display:grid;
  grid-template-columns:75px 75px;
  margin: 1rem 0;
  gap:1rem;
  border-bottom:${border};
`
);
const Tab = styled.div<{ active: boolean }>(
  ({ theme: { breakpoints, mainColor, textSecondary }, active }) => `
    padding:0.75rem 0;
    text-align:center;
    cursor:pointer;
    border-bottom:${active ? `2px solid ${mainColor}` : "none"};
   

   &:hover {
    color:${!active && textSecondary};
   }

`
);
