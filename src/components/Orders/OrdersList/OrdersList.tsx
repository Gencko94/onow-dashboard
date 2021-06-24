import React, { Dispatch, SetStateAction, useMemo } from "react";
import { InfiniteData } from "react-query";
import styled from "styled-components";
import { GET_ORDERS_RESPONSE, ORDER } from "../../../interfaces/orders/orders";
import { ORDER_SORT } from "../../../pages/Orders";
import Button from "../../reusable/Button";
import ExportAs from "../../reusable/ExportAs";
import TableHead from "../../reusable/TableHead";
import OrderItem from "./OrderItem";
interface IProps {
  data: InfiniteData<GET_ORDERS_RESPONSE>;
  sortBy: ORDER_SORT;
  setSortBy: Dispatch<SetStateAction<ORDER_SORT>>;
}
const OrdersList = ({ data, setSortBy, sortBy }: IProps) => {
  const cols = useMemo(
    () => [
      { title: "id", sortable: false },
      {
        title: "customerName",
        sortable: true,
        cb: () => {
          if (sortBy.by === "customerName") {
            if (sortBy.order === "asc") {
              setSortBy({ by: "customerName", order: "desc" });
            } else {
              setSortBy({ by: "customerName", order: "asc" });
            }
          } else {
            setSortBy({ by: "customerName", order: "desc" });
          }
        },
      },
      {
        title: "orderType",
        sortable: true,
        cb: () => {
          if (sortBy.by === "orderType") {
            if (sortBy.order === "asc") {
              setSortBy({ by: "orderType", order: "desc" });
            } else {
              setSortBy({ by: "orderType", order: "asc" });
            }
          } else {
            setSortBy({ by: "orderType", order: "desc" });
          }
        },
      },
      {
        title: "paymentType",
        sortable: true,
        cb: () => {
          if (sortBy.by === "paymentType") {
            if (sortBy.order === "asc") {
              setSortBy({ by: "paymentType", order: "desc" });
            } else {
              setSortBy({ by: "paymentType", order: "asc" });
            }
          } else {
            setSortBy({ by: "paymentType", order: "desc" });
          }
        },
      },
      {
        title: "paymentStatus",
        sortable: true,
        cb: () => {
          if (sortBy.by === "paymentStatus") {
            if (sortBy.order === "asc") {
              setSortBy({ by: "paymentStatus", order: "desc" });
            } else {
              setSortBy({ by: "paymentStatus", order: "asc" });
            }
          } else {
            setSortBy({ by: "paymentStatus", order: "desc" });
          }
        },
      },
      {
        title: "orderStatus",
        sortable: false,
      },
      {
        title: "orderDate",
        sortable: true,
        cb: () => {
          if (sortBy.by === "orderDate") {
            if (sortBy.order === "asc") {
              setSortBy({ by: "orderDate", order: "desc" });
            } else {
              setSortBy({ by: "orderDate", order: "asc" });
            }
          } else {
            setSortBy({ by: "orderDate", order: "desc" });
          }
        },
      },
      {
        title: "actions",
        sortable: false,
      },
    ],
    [sortBy]
  );
  return (
    <Container>
      <div className="title-container">
        <h5>Orders List</h5>
        <ExportAs />
      </div>
      <TableContainer>
        <TableHead
          cols={cols}
          gridCols="0.25fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
          activeSortBy={sortBy.by}
          activeOrder={sortBy.order}
        />

        <div>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.orders.map((order) => (
                <OrderItem order={order} key={order.order_id} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </TableContainer>
    </Container>
  );
};

export default OrdersList;
const Container = styled.div`
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    h5 {
      color: ${(props) => props.theme.mainColor};
    }
  }
`;
const TableContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
