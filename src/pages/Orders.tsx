import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary, useInfiniteQuery } from "react-query";
import OrdersList from "../components/Orders/OrdersList/OrdersList";
import OrdersPanel from "../components/Orders/OrdersPanel/OrdersPanel";
import OrdersThumbnails from "../components/Orders/OrdersThumbnails/OrdersThumbnails";
import Button from "../components/reusable/Button";
import Flex from "../components/StyledComponents/Flex";
import Hr from "../components/StyledComponents/Hr";
import {
  GET_ORDERS_RESPONSE,
  ORDERS_FILTERS,
} from "../interfaces/orders/orders";
import Loading from "../utils/Loading";
import { getOrders } from "../utils/queries";

export interface ORDER_SORT {
  by:
    | "orderStatus"
    | "orderDate"
    | "paymentStatus"
    | "paymentType"
    | "orderType"
    | "customerName";
  order: "asc" | "desc";
}
const Orders = () => {
  const [filters, setFilters] = useState<ORDERS_FILTERS>({
    orderStatus: null,
    paymentType: null,
    orderMode: null,
    paymentStatus: null,
    orderAmount: {
      from: "",
      to: "",
    },
    orderDate: {
      from: "",
      to: "",
    },
  });
  const [sortBy, setSortBy] = useState<ORDER_SORT>({
    by: "orderDate",
    order: "desc",
  });
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<GET_ORDERS_RESPONSE>(
      ["store-orders", filters],
      ({ pageParam = 1 }) => getOrders({ filters, pageParam }),
      {
        suspense: true,
        keepPreviousData: true,
        getNextPageParam: (lastPage) => {
          if (lastPage.currentPage < lastPage.lastPage) {
            return lastPage.currentPage + 1;
          } else {
            return undefined;
          }
        },
      }
    );

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              Something went wrong , please try again
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<Loading />}>
            <OrdersPanel filters={filters} setFilters={setFilters} />

            <OrdersThumbnails stats={data!.pages[0].stats} />
            <Hr />

            <OrdersList data={data!} sortBy={sortBy} setSortBy={setSortBy} />
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
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Orders;
