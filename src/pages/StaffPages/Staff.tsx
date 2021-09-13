import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

import ExportAs from "../../components/reusable/ExportAs";
import StaffItem from "../../components/Staff/StaffItem";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import TableHead from "../../components/reusable/TableHead/TableHead";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { deleteStaffMember, getStaffMembers } from "../../utils/queries";
import Flex from "../../components/StyledComponents/Flex";
import Heading from "../../components/StyledComponents/Heading";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import IconWrapper from "../../components/reusable/Icon";
import { IoMdAdd } from "react-icons/io";
import Button from "../../components/reusable/Button";
import { useHistory } from "react-router-dom";
import Spacer from "../../components/reusable/Spacer";
import Spinner from "react-loader-spinner";
const Staff = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { handleCloseConfirmationModal } = useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const { data, isLoading } = useQuery<STAFF_MEMBER[]>(
    "staff-members",
    getStaffMembers
  );
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
      onError: (error) => {
        const { responseError } = extractError(error);
        if (responseError) {
          setToastStatus?.({
            fn: () => {
              resetDelete();
              handleCloseToast?.();
            },
            open: true,
            text: responseError,
            type: "error",
          });
        } else {
          setToastStatus?.({
            fn: () => {
              resetDelete();
              handleCloseToast?.();
            },
            open: true,
            text: "Something went wrong",
            type: "error",
          });
        }
      },
    }
  );
  const handleDeleteStaffMember = async (staffId: number) => {
    handleCloseConfirmationModal?.();
    await deleteStaff(staffId);
    setToastStatus?.({
      fn: () => {
        handleCloseToast?.();
      },
      open: true,
      text: "Staff Member Deleted Successfully",
      type: "success",
    });
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
    <div>
      <Heading tag="h5" type="large-title">
        Staff Members
      </Heading>
      <Breadcrumbs
        withoutTitle
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
        <Button
          onClick={() => history.push("/settings/staff/member/create")}
          color="primary"
          withTransition
          size="md"
        >
          <IconWrapper Icon={IoMdAdd} />
          Create New Member
        </Button>
      </Flex>

      <ExportAs />
      <Spacer size={40} />
      <TableContainer>
        <div className="table">
          {data?.length !== 0 && <TableHead gap="0" cols={cols} />}
          {isLoading && (
            <div className="loading">
              <Spinner type="TailSpin" width={30} color="#f78f21" />
            </div>
          )}

          {data?.map((member) => (
            <StaffItem
              member={member}
              key={member.id}
              handleDeleteStaffMember={handleDeleteStaffMember}
            />
          ))}
        </div>
      </TableContainer>
    </div>
  );
};

export default Staff;

const TableContainer = styled.div`
  border-bottom: none;

  position: relative;
  .table {
    border-radius: 20px;
    border: ${(props) => props.theme.border};

    overflow-x: auto;
    overflow-y: hidden;
    border-radius: 20px;
    background-color: ${(props) => props.theme.subtleBackground};
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
