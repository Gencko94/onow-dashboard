import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import OrderBody from "../components/Order/OrderBody/OrderBody";
import OrderPanel from "../components/Order/OrderPanel/OrderPanel";
import OrderSide from "../components/Order/OrderSide/OrderSide";
import Breadcrumbs from "../components/reusable/Breadcrumbs";
import Heading from "../components/StyledComponents/Heading";
import { getOrder } from "../utils/queries";

const Order = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(["order", id], () => getOrder(id), {
    suspense: true,
  });
  return (
    <>
      <Heading tag="h5" type="large-title">
        Order
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الطلبات", en: "Orders" },
            target: "/orders",
          },
          {
            name: { ar: "الطلب", en: "Order" },
            target: "",
          },
        ]}
      />
      <OrderPanel />

      <hr />
      <OrderContainer>
        <OrderBody data={data!} />
        <OrderSide data={data!} />
      </OrderContainer>
    </>
  );
};

export default Order;

const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 0.5rem;
  margin: 1rem 0;
`;
