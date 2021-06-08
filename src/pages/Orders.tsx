import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import OrdersList from "../components/Orders/OrdersList/OrdersList";
import OrdersPanel from "../components/Orders/OrdersPanel/OrdersPanel";
import OrdersThumbnails from "../components/Orders/OrdersThumbnails/OrdersThumbnails";
import { ORDERS_FILTERS } from "../interfaces/orders/orders";
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
const Orders = ({ storeId }: { storeId: number }) => {
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
  const { data } = useQuery(
    ["store-orders", storeId, filters],
    () => getOrders({ storeId, filters }),
    {
      suspense: true,
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
            <hr />
            <OrdersThumbnails stats={data!.stats} />
            <hr />

            <OrdersList
              orders={data!.orders}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Orders;
