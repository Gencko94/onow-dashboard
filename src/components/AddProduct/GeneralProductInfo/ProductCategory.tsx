import styled from 'styled-components';
import Select from 'react-select';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import AddCategoryModalBody from '../../Modal/AddCategoryModalBody';
import { CSSTransition } from 'react-transition-group';
import ClickAwayListener from 'react-click-away-listener';
const options = [
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Food' },
];
const ProductCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Title>Product Category</Title>
      <Select
        // defaultValue={options[0]}
        isMulti
        // name="colors"
        options={options}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id.toString()}
        // className="basic-multi-select"
        // classNamePrefix="select"
      />
      <ButtonsContainer>
        <AddButton onClick={() => setOpen(true)}>
          <Icon>
            <BiPlus size={30} />
          </Icon>
          <BtnText>Quick Add New Category</BtnText>
        </AddButton>
      </ButtonsContainer>
      <CSSTransition in={open} timeout={100} classNames="modal" unmountOnExit>
        <Modal title="Add Category" closeFunction={() => setOpen(false)}>
          <AddCategoryModalBody />
        </Modal>
      </CSSTransition>
    </Container>
  );
};

export default ProductCategory;
const Container = styled.div``;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
const ButtonsContainer = styled.div`
  padding: 0.5rem 0;
`;
const AddButton = styled.button`
  background-color: ${props => props.theme.green};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  margin: 0 0.5rem;
`;
