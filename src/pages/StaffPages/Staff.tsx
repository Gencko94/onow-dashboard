import { useQuery } from "react-query";
import styled from "styled-components";
import AddButton from "../../components/reusable/AddButton";
import ExportAs from "../../components/reusable/ExportAs";
import StaffItem from "../../components/Staff/StaffItem";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import { getStoreStaffMembers } from "../../utils/test-queries";

const Staff = () => {
  const { data } = useQuery<STAFF_MEMBER[]>(
    "staff-members",
    getStoreStaffMembers,
    { suspense: true }
  );
  return (
    <Container>
      <div className="panel">
        <AddButton title="Create New Member" target="/staff/create" />
      </div>
      <div className="title-container">
        <h5>Staff Members</h5>
        <ExportAs />
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
            <h6>Email Address</h6>
          </div>
          <div className="field">
            <h6>Role</h6>
          </div>

          <div className="field">
            <h6>Actions</h6>
          </div>
        </div>
        <div>
          {data?.map((member) => (
            <StaffItem member={member} key={member.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Staff;
const Container = styled.div`
  padding: 0.75rem;
  .panel {
    padding: 0.75rem 0;
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
