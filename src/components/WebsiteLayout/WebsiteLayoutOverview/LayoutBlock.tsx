import styled from 'styled-components';
interface IProps {
  type: string;
}
const LayoutBlock = ({ type }: IProps) => {
  return (
    <Container>
      <h6>{type}</h6>
      <ButtonsContainer>
        <button>Edit</button>
        <button>Delete</button>
      </ButtonsContainer>
    </Container>
  );
};

export default LayoutBlock;

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
