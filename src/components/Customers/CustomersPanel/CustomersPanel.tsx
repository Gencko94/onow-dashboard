import { Dispatch, SetStateAction } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';
interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomersPanel = ({ setModalOpen }: IProps) => {
  return (
    <Container>
      <button onClick={() => setModalOpen(true)} className="addBtn">
        <Icon>
          <BiPlus size={30} />
        </Icon>
        <p>Add New Customer</p>
      </button>
    </Container>
  );
};

export default CustomersPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .addBtn {
    background-color: ${props => props.theme.green};
    box-shadow: ${props => props.theme.shadow};
    border-radius: 7px;
    position: relative;
    padding: 0.25rem 0.5rem;
    color: #fff;
    display: flex;
    align-items: center;
    p {
      font-size: 0.9rem;
      font-weight: ${props => props.theme.font.regular};
      margin: 0 0.5rem;
    }
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
