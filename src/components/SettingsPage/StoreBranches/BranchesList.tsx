import React, { useMemo } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import extractError from "../../../utils/extractError";
import { getBranches } from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import BranchItem from "./BranchItem";
import Spinner from "react-loader-spinner";
import { deleteBranch } from "../../../utils/queries/branchesQueries";

export type GET_BRANCHES_RES = {
  data: BRANCH[];
  currentPage: number;
  lastPage: number;
};
const BranchesList = () => {
  const { handleCloseConfirmationModal } = useConfirmationModal();

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const queryClient = useQueryClient();

  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GET_BRANCHES_RES>(
    "branches",
    ({ pageParam = 1 }) => getBranches(pageParam),
    {
      suspense: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  // Delete Mutation
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteBranch, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("branches");
    },
  });
  const handleDeleteBranch = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Branch Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const cols = useMemo(
    () => [
      { title: "id", sortable: false },
      { title: "branch-name", sortable: false },
      { title: "phone-number", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <>
      <Container>
        <div className="table">
          {data?.pages[0].data.length !== 0 && (
            <TableHead
              // activeSortBy={sortBy.field}
              // activeOrder={sortBy.order}
              cols={cols}
              gap="0.5rem"
              gridCols="minmax(70px, 100px) repeat(
                3,
                minmax(100px, 1fr)
              ) minmax(210px, 1.5fr)"
            />
          )}
          {isFetching && (
            <div className="loading">
              <Spinner type="TailSpin" width={30} color="#f78f21" />
            </div>
          )}
          {data?.pages[0].data.length === 0 && (
            <EmptyTable
              iconImage="/images/food.png"
              text="Oops, we didn't find any Branches !"
              height="400px"
              withButton
              btnText="Create New Branch"
              cb={() => history.push("/settings/branches/create/branch")}
            />
          )}
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((branch) => (
                  <BranchItem
                    handleDeleteBranch={handleDeleteBranch}
                    key={branch.id}
                    branch={branch}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
      {hasNextPage && (
        <Flex margin="2rem 0" justify="center">
          <Button
            isLoading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            withRipple
            bg="green"
            padding="0.25rem 0.5rem"
            textSize="0.8rem"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </>
  );
};

export default BranchesList;
const Container = styled.div`
  margin-top: 2rem;
  border-radius: 6px;
  border: ${(props) => props.theme.border};

  position: relative;
  .table {
    overflow-x: auto;
    background-color: #fff;
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
