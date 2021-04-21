import styled from 'styled-components';
import { blocks } from '../../interfaces/website-layout/blocks';
import NewBlockModalItem from '../WebsiteLayout/WebsiteLayoutOverview/NewBlockModalItem';

const AddBlockModal = () => {
  return (
    <Container>
      <div className="grid">
        {blocks.map(item => (
          <NewBlockModalItem key={item.type} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default AddBlockModal;
const Container = styled.div`
  width: 900px;
  max-height: calc(100vh - 100px);
  overflow: auto;
  .grid {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
  }
`;
