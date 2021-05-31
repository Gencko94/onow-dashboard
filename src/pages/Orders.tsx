import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import OrdersList from "../components/Orders/OrdersList/OrdersList";
import OrdersPanel from "../components/Orders/OrdersPanel/OrdersPanel";
import OrdersThumbnails from "../components/Orders/OrdersThumbnails/OrdersThumbnails";
import {
  GET_ORDERS_RESPONSE,
  ORDERS_FILTERS,
  STORE_ORDERS,
} from "../interfaces/orders/orders";
import { getOrders } from "../utils/queries";
import { getStoreOrders } from "../utils/test-queries";
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
    ["store-orders", storeId],
    () => getOrders(storeId),
    {
      suspense: true,
    }
  );
  return (
    <div>
      <OrdersPanel filters={filters} setFilters={setFilters} />
      <hr />
      {/* <OrdersThumbnails stats={data!.stats} /> */}
      <hr />
      {/* <Box> */}
      <OrdersList orders={data!} sortBy={sortBy} setSortBy={setSortBy} />
      {/* </Box> */}
    </div>
  );
};

export default Orders;
const Box = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  background-color: #fff;
  border-radius: 6px;
  padding: 0.5rem;
`;
