import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import OrdersList from "../components/Orders/OrdersList/OrdersList";
import OrdersPanel from "../components/Orders/OrdersPanel/OrdersPanel";
import OrdersThumbnails from "../components/Orders/OrdersThumbnails/OrdersThumbnails";
import { ORDERS_FILTERS, STORE_ORDERS } from "../interfaces/orders/orders";
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
  const { data } = useQuery<STORE_ORDERS>("store-orders", getStoreOrders, {
    suspense: true,
  });
  return (
    <div>
      <OrdersPanel filters={filters} setFilters={setFilters} />
      <hr />
      <OrdersThumbnails stats={data!.stats} />
      <hr />
      <OrdersList orders={data!.orders} sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
};

export default Orders;
