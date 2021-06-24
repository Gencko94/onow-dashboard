import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "react-loader-spinner";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { COUPON } from "../../../interfaces/coupons/coupons";
import extractError from "../../../utils/extractError";
import { deleteCoupon, getCoupons } from "../../../utils/queries";
import Button from "../../reusable/Button";
import ConfirmationModal from "../../reusable/ConfirmationModal";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import CouponItem from "./CouponItem";
type GET_COUPONS_RES = {
  data: COUPON[];
  currentPage: number;
  lastPage: number;
};
const CouponsList = () => {
  const queryClient = useQueryClient();
  const [modalStatus, setModalStatus] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });
  const { handleCloseToast, setToastStatus } = useToast();
  const cols = useMemo(
    () => [
      { title: "couponName", sortable: false },
      { title: "status", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const [sortBy, setSortBy] = useState({
    by: "orderDate",
    order: "desc",
  });
  const history = useHistory();
  const { t } = useTranslation();
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
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCoupon, {
    onSuccess: (data, couponId, context) => {
      queryClient.invalidateQueries(["coupons", sortBy]);
    },
  });

  const handleDeleteCoupon = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      setModalStatus({ id: null, open: false });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Coupon Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      setModalStatus({ id: null, open: false });
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
  if (status === "loading") return <LoadingTable />;

  return (
    <Container>
      {data?.pages[0].data.length !== 0 && <TableHead cols={cols} />}

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
                  coupon={coupon}
                  sortBy={sortBy}
                  setModalStatus={setModalStatus}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <ConfirmationModal
        isOpen={modalStatus.open}
        closeFunction={() => setModalStatus({ id: null, open: false })}
        desc="Are you sure you want to delete this product ?"
        successButtonText="Delete"
        successFunction={() => handleDeleteCoupon(modalStatus.id!)}
        title="Delete Product"
        isLoading={deleteLoading}
        styles={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />
      {hasNextPage && (
        <Flex margin="2rem 0" justify="center">
          <Button
            isLoading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            withRipple
            text="Load More"
            bg="green"
            padding="0.25rem 0.5rem"
            textSize="0.8rem"
            onClick={() => {
              fetchNextPage();
            }}
          />
        </Flex>
      )}
    </Container>
  );
};

export default CouponsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
  position: relative;
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
