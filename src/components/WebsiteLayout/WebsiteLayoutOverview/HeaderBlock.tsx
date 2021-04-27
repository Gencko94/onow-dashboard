import { useHistory } from 'react-router';
import styled from 'styled-components';

const HeaderBlock = () => {
  const history = useHistory();
  return (
    <Container>
      <h6>Header</h6>
      <ButtonsContainer>
        <button
          onClick={() => history.push('/website-layout/design-select/header')}
        >
          Edit
        </button>
        <button>Delete</button>
      </ButtonsContainer>
    </Container>
  );
};

export default HeaderBlock;
const Container = styled.div`
  border-radius: 12px;
  height: 150px;
  border: ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h6 {
    margin-bottom: 0.75rem;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 0.5rem;
    background-color: ${props => props.theme.green};
    color: #fff;
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
`;
