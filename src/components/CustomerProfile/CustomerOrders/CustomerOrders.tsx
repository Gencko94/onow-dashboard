import React, { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { GET_ORDERS_BY_CUSTOMER_RESPONSE } from "../../../interfaces/orders/orders";
import { ORDER_SORT } from "../../../pages/Orders";
import { getOrdersByCustomer } from "../../../utils/queries";
import OrderItem from "../../Orders/OrdersList/OrderItem";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead/TableHead";
import Flex from "../../StyledComponents/Flex";

interface IProps {
  customerId: number;
}

const CustomerOrders = ({ customerId }: IProps) => {
  const [sortBy, setSortBy] = useState<ORDER_SORT>({
    by: "orderDate",
    order: "desc",
  });
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<GET_ORDERS_BY_CUSTOMER_RESPONSE>(
      ["store-orders", sortBy],
      ({ pageParam = 1 }) =>
        getOrdersByCustomer({ sortBy, pageParam, customerId, limit: 2 }),
      {
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
  if (status === "loading") return <LoadingTable />;
  return (
    <>
      <Box type="titled" boxTitle="Customer Orders">
        {data!.pages[0].orders.length !== 0 && (
          <TableHead
            gridCols="100px 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
            cols={cols}
            activeSortBy={sortBy.by}
            activeOrder={sortBy.order}
          />
        )}
        {data!.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.orders.map((order) => (
              <OrderItem order={order} key={order.order_id} />
            ))}
          </React.Fragment>
        ))}
        {data!.pages[0].orders.length === 0 && (
          <EmptyTable height="100%" text="This customer has no orders yet" />
        )}
      </Box>
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
    </>
  );
};

export default CustomerOrders;
