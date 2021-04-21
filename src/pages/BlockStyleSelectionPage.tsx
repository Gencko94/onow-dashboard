import { useQuery } from 'react-query';
import { Redirect, useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { BLOCK_STYLE } from '../interfaces/website-layout/blocks';
import { getBlockStyles } from '../utils/test-queries';

const BlockStyleSelectionPage = () => {
  const { type } = useParams<{ type: string }>();
  const history = useHistory();
  const { data } = useQuery<BLOCK_STYLE[]>(
    `${type}-styles`,
    () => getBlockStyles(type),
    { enabled: Boolean(type) }
  );
  if (!type) {
    return <Redirect to="/website-layout" />;
  }
  return (
    <Container>
      <h4 className="title">Select your preferred Header style </h4>
      {data?.map(item => (
        <BlockStyle key={item.id}>
          <img src={item.photo} />
          <div className="btn-container">
            <Button selected={item.selected}>
              {item.selected ? 'Selected' : 'Select'}
            </Button>
            {item.selected && (
              <Button
                onClick={() =>
                  history.push(`/website-layout/block-customize/${item.type}`)
                }
              >
                Customize
              </Button>
            )}
          </div>
        </BlockStyle>
      ))}
    </Container>
  );
};

export default BlockStyleSelectionPage;

const Container = styled.div`
  padding: 0.75rem;
  .title {
    margin-bottom: 1rem;
  }
`;
const BlockStyle = styled.div`
  border: ${props => props.theme.border};
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  img {
    margin-bottom: 2rem;
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Button = styled.button<{ selected?: boolean }>`
  background-color: ${props => (props.selected ? 'gray' : props.theme.green)};
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  color: #fff;
  margin: 0 1rem;
`;
