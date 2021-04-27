import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';
import Flex, { Wrapper as FlexWrapper } from '../../../StyledComponents/Flex';
interface IProps {
  onChange: () => void;
}

const AddProductsModal = ({ onChange }: IProps) => {
  return (
    <Container>
      <Flex items="center">
        <span className="icon">
          <GoSearch />
        </span>
        <input placeholder="Search For products" />
      </Flex>
    </Container>
  );
};

export default AddProductsModal;
const Container = styled.div`
  padding: 0.5rem;
  width: 500px;
  ${FlexWrapper} {
    border: ${props => props.theme.border};
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
  }
  input {
    flex: auto;
    padding: 0.4rem;
  }
`;
