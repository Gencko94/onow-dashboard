import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ORDER_ITEM } from '../../../interfaces/orders/orders';
interface IProps {
  item: ORDER_ITEM;
}
const SingleOrderItem: FC<IProps> = ({ item }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="col name span">
        <img src={item.image} alt="" className="image" />
        <p>{item.name[language]}</p>
      </div>
      <div className="col">{item.price}</div>
      <div className="col">{item.qty}</div>
      <div className="col">{item.totalPrice}</div>
    </Container>
  );
};

export default SingleOrderItem;
const Container = styled.div`
  border-bottom: ${props => props.theme.border};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  .col {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  .span {
    grid-column: 1/5;
  }
  .col.name {
    .image {
      width: 50px;
      height: 50px;
      outline: ${props => props.theme.border};
    }
    p {
      margin: 0 0.25rem;
    }
  }
`;
