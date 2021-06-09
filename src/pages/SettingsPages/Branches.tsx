import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import AddButton from "../../components/reusable/AddButton";

import BranchesList from "../../components/SettingsPage/StoreBranches/BranchesList";

const Branches = () => {
  return (
    <Container>
      <Breadcrumbs
        childLabel="Branches"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <div className="panel">
        <AddButton
          title="Create New Branch"
          target="/settings/branches/create/branch"
        />
      </div>
      <BranchesList />
    </Container>
  );
};

export default Branches;
const Container = styled.div`
  .panel {
    padding: 1rem 0;
  }
`;
