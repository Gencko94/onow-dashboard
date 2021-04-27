import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

const SearchBarDemo = () => {
  return (
    <Container>
      <span className="icon">
        <GoSearch />
      </span>
      <input />
    </Container>
  );
};

export default SearchBarDemo;
const Container = styled.div`
  display: flex;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
  background-color: ${props => props.theme.inputColorLight};
  .icon {
    padding: 0.5rem;
  }
  input {
    flex: auto;
    padding: 0.5rem;
    font-size: 0.8rem;
    border-left: ${props => props.theme.border};
  }
`;
