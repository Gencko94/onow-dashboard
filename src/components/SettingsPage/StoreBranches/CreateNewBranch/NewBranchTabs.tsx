import { useContext } from "react";
import styled from "styled-components";
import { NewBranchContext } from "../../../../pages/SettingsPages/Branches/CreateNewBranch";

const NewBranchTabs = () => {
  const { activeTab } = useContext(NewBranchContext);
  return (
    <Container>
      <TabItem type="button" active={activeTab === 0}>
        Branch Information & Location
      </TabItem>

      <TabItem type="button" active={activeTab === 1}>
        Branch Working hours
      </TabItem>
      <TabItem type="button" active={activeTab === 2}>
        Branch Delivery zones
      </TabItem>
    </Container>
  );
};

export default NewBranchTabs;
const Container = styled.div`
  padding-top: 0.5rem;

  border-radius: 5px;

  display: flex;
  gap: 0.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>`
  padding: 0.75rem;
  transition: color 150ms ease;
  font-size: 0.9rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background-color: #fff;

  color: ${(props) =>
    props.active ? props.theme.mainColor : props.theme.subHeading};

  font-weight: ${(props) => props.active && props.theme.font.bold};
  &:hover {
    color: ${(props) => !props.active && props.theme.headingColor};
  }
`;
