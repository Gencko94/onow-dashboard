import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ORDER_ITEM } from "../../../interfaces/orders/orders";
interface IProps {
  item: ORDER_ITEM;
}
const SingleOrderItem: FC<IProps> = ({ item }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="name">
        <img src={item.image} alt="" className="image" />
        <p>{item.name[language]}</p>
      </div>
      <div className="qty">
        <p>{item.price}</p>
        <span>X</span>
        <span className="qty">{item.qty}</span>
      </div>
      {/* <div className="qty">
        <p>Price </p>
        <span>X</span>
        <p>Quantity </p>
      </div> */}
      <div className="total">{item.totalPrice}</div>
    </Container>
  );
};

export default SingleOrderItem;
const Container = styled.div`
  padding: 1rem;
  border-bottom: ${(props) => props.theme.border};
  display: grid;
  gap: 1rem;
  font-size: 0.9rem;
  align-items: center;
  grid-template-columns: 300px 200px 1fr;
  .name {
    display: grid;
    gap: 0.25rem;
    align-items: center;
    grid-template-columns: auto 1fr;
    .image {
      width: 40px;
      height: 40px;
      outline: ${(props) => props.theme.border};
    }
    p {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
  div.qty {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    span.qty {
      padding: 0.25rem 0.5rem;
      background-color: ${(props) => props.theme.subtleBackground};
      border-radius: 6px;
    }
  }
  div.total {
    justify-self: flex-end;
  }
`;
