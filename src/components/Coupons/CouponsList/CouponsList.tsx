import React, { useMemo, useState } from "react";

import Spinner from "react-loader-spinner";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { COUPON } from "../../../interfaces/coupons/coupons";
import extractError from "../../../utils/extractError";
import {
  deleteCoupon,
  deleteMultipleCoupons,
  getCoupons,
} from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead/TableHead";
import Flex from "../../StyledComponents/Flex";
import CouponItem from "./CouponItem";
type GET_COUPONS_RES = {
  data: COUPON[];
  currentPage: number;
  lastPage: number;
};
const CouponsList = () => {
  const queryClient = useQueryClient();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const cols = useMemo(
    () => [
      { title: "", sortable: false },
      { title: "couponName", sortable: false },
      { title: "code", sortable: false },
      { title: "validFrom", sortable: false },
      { title: "validTill", sortable: false },
      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const [sortBy] = useState({
    by: "orderDate",
    order: "desc",
  });
  const history = useHistory();

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
    status,
  } = useInfiniteQuery<GET_COUPONS_RES>(
    ["coupons", sortBy],
    ({ pageParam = 1 }) => getCoupons(sortBy, pageParam),
    {
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
  const { mutateAsync, reset } = useMutation(deleteCoupon, {
    onSuccess: (data, couponId, context) => {
      queryClient.invalidateQueries(["coupons", sortBy]);
    },
  });
  // Delete Mutation
  const {
    mutateAsync: deleteMultiple,
    reset: resetMultiple,
    isLoading: multipleDeleteLoading,
  } = useMutation(deleteMultipleCoupons, {
    onSuccess: (data, couponId, context) => {
      queryClient.invalidateQueries(["coupons", sortBy]);
    },
  });

  const handleDeleteCoupon = async (id: number) => {
    try {
      await mutateAsync(id.toString());

      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Coupon Deleted Successfully",
        type: "success",
      });
      handleCloseConfirmationModal?.();
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
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
  const handleDeleteMultipleCoupons = async (ids: number[]) => {
    try {
      handleCloseConfirmationModal?.();
      await deleteMultiple(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Coupons Deleted Successfully",
        type: "success",
      });
      setSelectedRows([]);
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
      } else {
        setToastStatus?.({
          fn: () => {
            resetMultiple();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  if (status === "loading") return <LoadingTable />;

  return (
    <>
      {data?.pages[0].data.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              disabled={selectedRows.length === 0 || multipleDeleteLoading}
              color="danger"
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                setConfirmationModalStatus?.({
                  closeCb: handleCloseConfirmationModal!,
                  open: true,
                  desc: "Are you sure you want to delete these coupons ?",
                  successCb: () => {
                    handleDeleteMultipleCoupons(selectedRows);
                  },
                  title: "Delete Coupons",
                });
              }}
            >
              Delete {selectedRows.length > 0 ? selectedRows.length : ""}{" "}
              Coupons
            </Button>
          </Flex>
        </Flex>
      )}
      <Container>
        <div className="table">
          {data?.pages[0].data.length !== 0 && (
            <TableHead
              gap="0"
              cols={cols}
              gridCols="repeat(1, minmax(35px, 50px)) repeat(
            6,
            minmax(140px, 1fr)
          );"
            />
          )}

          <div>
            {isFetching && (
              <div className="loading">
                <Spinner type="TailSpin" width={30} color="#f78f21" />
              </div>
            )}
            {data?.pages[0].data.length === 0 && (
              <EmptyTable
                iconImage="/images/food.png"
                text="You have not added any coupons !"
                height="400px"
                withButton
                btnText="Create New Coupon"
                cb={() => history.push("/coupons/create")}
              />
            )}
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((coupon) => {
                  return (
                    <CouponItem
                      key={coupon.id}
                      handleToggleRows={handleToggleRows}
                      selectedRows={selectedRows}
                      coupon={coupon}
                      handleDeleteCoupon={handleDeleteCoupon}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {hasNextPage && (
            <Flex margin="2rem 0" justify="center">
              <Button
                isLoading={isFetchingNextPage}
                disabled={isFetchingNextPage}
                color="green"
                onClick={() => {
                  fetchNextPage();
                }}
              >
                Load more
              </Button>
            </Flex>
          )}
        </div>
      </Container>
    </>
  );
};

export default CouponsList;
const Container = styled.div`
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
