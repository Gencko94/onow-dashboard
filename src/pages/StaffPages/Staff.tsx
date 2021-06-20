import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import AddButton from "../../components/reusable/AddButton";
import ExportAs from "../../components/reusable/ExportAs";
import StaffItem from "../../components/Staff/StaffItem";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import TableHead from "../../components/reusable/TableHead";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { getStaffMembers } from "../../utils/queries";

const Staff = () => {
  const { data } = useQuery<STAFF_MEMBER[]>("staff-members", getStaffMembers, {
    suspense: true,
  });
  const cols = useMemo(
    () => [
      {
        title: "name",
        sortable: false,
      },
      {
        title: "phoneNumber",
        sortable: false,
      },
      {
        title: "emailAddress",
        sortable: false,
      },
      {
        title: "role",
        sortable: false,
      },
      {
        title: "actions",
        sortable: false,
      },
    ],
    []
  );
  return (
    <Container>
      <Breadcrumbs
        childLabel="Staff Members"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <div className="panel">
        <AddButton
          title="Create New Member"
          target="/settings/staff/member/create"
        />
      </div>
      <div className="title-container">
        <h5>Staff Members</h5>
        <ExportAs />
      </div>
      <div className="table">
        <TableHead cols={cols} />

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
`;
