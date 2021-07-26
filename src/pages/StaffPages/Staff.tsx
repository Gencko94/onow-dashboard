import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import AddButton from "../../components/reusable/AddButton";
import ExportAs from "../../components/reusable/ExportAs";
import StaffItem from "../../components/Staff/StaffItem";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import TableHead from "../../components/reusable/TableHead";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { deleteStaffMember, getStaffMembers } from "../../utils/queries";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Flex from "../../components/StyledComponents/Flex";
import Heading from "../../components/StyledComponents/Heading";
import useConfirmationModal from "../../hooks/useConfirmationModal";

const Staff = () => {
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { data } = useQuery<STAFF_MEMBER[]>("staff-members", getStaffMembers, {
    suspense: true,
  });
  const { mutateAsync: deleteStaff, reset: resetDelete } = useMutation(
    deleteStaffMember,
    {
      onSuccess: (data, staffId) => {
        queryClient.setQueryData<STAFF_MEMBER[] | undefined>(
          "staff-members",
          (prev) => {
            return prev?.filter((i) => i.id !== staffId);
          }
        );
      },
    }
  );
  const handleDeleteStaffMember = async (staffId: number) => {
    await deleteStaff(staffId);
    handleCloseConfirmationModal?.();
  };
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
      <HeaderContainer>
        <Breadcrumbs
          children={[
            {
              name: { ar: "الإعدادات", en: "Settings" },
              target: "/settings",
            },
            {
              name: { ar: "أعضاء المتجر", en: "Store Staff" },
              target: "",
            },
          ]}
        />
        <Flex justify="flex-end" padding="0.5rem">
          <AddButton
            title="Create New Member"
            target="/settings/staff/member/create"
          />
        </Flex>
      </HeaderContainer>
      <div className="title-container">
        <Heading tag="h6">Staff Members</Heading>
        <ExportAs />
      </div>
      <div className="table">
        <TableHead cols={cols} />

        <div>
          {data?.map((member) => (
            <StaffItem
              member={member}
              key={member.id}
              handleDeleteStaffMember={handleDeleteStaffMember}
            />
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
