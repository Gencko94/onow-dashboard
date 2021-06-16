import { useMemo, useState } from "react";
import styled from "styled-components";
import { ORDER } from "../../../interfaces/orders/orders";
import { ORDER_SORT } from "../../../pages/Orders";
import EmptyTable from "../../reusable/EmptyTable";
import TableHead from "../../reusable/TableHead";

import CustomerProfileOrderItem from "./CustomerProfileOrderItem";

interface IProps {
  orders: ORDER[];
}

const CustomerProfileOrders = ({ orders }: IProps) => {
  const [sortBy, setSortBy] = useState<ORDER_SORT>({
    by: "orderDate",
    order: "desc",
  });
  const cols = useMemo(
    () => [
      { title: "id", sortable: false },

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
        <h5>Customer Orders</h5>
      </div>
      <div className="box">
        {orders.length > 0 && (
          <TableHead
            cols={cols}
            activeSortBy={sortBy.by}
            activeOrder={sortBy.order}
          />
        )}
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <CustomerProfileOrderItem key={order.order_id} order={order} />
            );
          })}
        {orders.length === 0 && (
          <EmptyTable height="100%" text="This customer has no orders yet" />
        )}
      </div>
    </Container>
  );
};

export default CustomerProfileOrders;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    
   
  }
  @media ${breakpoints.md} {
    
  }
  `
);
