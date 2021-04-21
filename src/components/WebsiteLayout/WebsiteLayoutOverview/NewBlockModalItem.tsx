import { useHistory } from 'react-router';
import styled from 'styled-components';
import { BLOCK_TYPE } from '../../../interfaces/website-layout/blocks';
interface IProps {
  item: BLOCK_TYPE;
}
const NewBlockModalItem = ({ item }: IProps) => {
  const history = useHistory();
  return (
    <Container
      onClick={() => history.push(`/website-layout/block/${item.type}`)}
    >
      <div className="img-container">
        <img src={item.photo} alt={item.type} />
      </div>
      <div className="title-container">
        <h6>{item.name}</h6>
      </div>
    </Container>
  );
};

export default NewBlockModalItem;
const Container = styled.div`
  position: relative;
  border-radius: 12px;
  cursor: pointer;

  box-shadow: ${props => props.theme.shadow};
  overflow: hidden;
  .img-container {
    height: 70px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  &:hover {
    transform: scale(1.03);
  }
  .title-container {
    padding: 0.25rem;
    text-align: center;
    background-color: ${props => props.theme.overlayColor};
  }
`;
