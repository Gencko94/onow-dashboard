import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import AddButton from "../../components/reusable/AddButton";

import BranchesList from "../../components/SettingsPage/Branches&Warehouses/BranchesList";

const BranchesAndWarehouses = () => {
  return (
    <Container>
      <Breadcrumbs
        childLabel="Branches & Warehouses"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <div className="panel">
        <AddButton
          title="Create New Branch/Warehouse"
          target="/settings/branch-warehouse/create/branch"
        />
      </div>
      <BranchesList />
    </Container>
  );
};

export default BranchesAndWarehouses;
const Container = styled.div`
  .panel {
    padding: 1rem 0;
  }
`;
