import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import AddButton from "../../components/reusable/AddButton";

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
          target="/branch-warehouse/create"
        />
      </div>
      <div className="title-container">
        <h5>Branches/Warehouses</h5>
      </div>
      <div className="table">
        <div className="table-head">
          <div className="field">
            <h6>Name</h6>
          </div>
          <div className="field">
            <h6>Phone Number</h6>
          </div>
          <div className="field">
            <h6>Type</h6>
          </div>
          <div className="field">
            <h6>Role</h6>
          </div>

          <div className="field">
            <h6>Actions</h6>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BranchesAndWarehouses;
const Container = styled.div`
  .panel {
    padding: 1rem 0;
  }
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
  .table {
    border-radius: 8px;
    overflow: hidden;
    border: ${(props) => props.theme.border};
    box-shadow: ${(props) => props.theme.shadow};
  }
  .table-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: ${(props) => props.theme.overlayColor};
    border-bottom: ${(props) => props.theme.border};
    gap: 1rem;
    .field {
      padding: 1rem 0.5rem;
      text-align: center;
      h6 {
        font-size: 0.9rem;
        color: ${(props) => props.theme.headingColor};
        font-weight: ${(props) => props.theme.font.semibold};
        text-align: center;
      }
    }
  }
`;
