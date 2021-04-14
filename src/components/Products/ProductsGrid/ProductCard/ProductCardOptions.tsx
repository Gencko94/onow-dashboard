import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const ProductCardOptions = () => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  return (
    <Container>
      <Option color="#a3a3a3">
        <OptionText>Edit</OptionText>

        <MdEdit size={22} />
      </Option>
      <Option onClick={() => setOptionsMenuOpen(!optionsMenuOpen)}>
        <OptionText>Options</OptionText>
        <Icon>
          <BsThreeDotsVertical size={22} />
        </Icon>
      </Option>
      <CSSTransition
        in={optionsMenuOpen}
        classNames="menu"
        unmountOnExit
        timeout={100}
      >
        <ClickAwayListener onClickAway={() => setOptionsMenuOpen(false)}>
          <OptionsList>
            <MenuItem>
              <Icon>
                <RiDeleteBinLine size={20} />
              </Icon>
              <OptionText>Delete</OptionText>
            </MenuItem>
            <MenuItem>
              <Icon>
                <FiCopy size={20} />
              </Icon>
              <OptionText>Copy</OptionText>
            </MenuItem>
            <MenuItem>
              <Icon>
                <FiCopy size={20} />
              </Icon>
              <OptionText>Duplicate</OptionText>
            </MenuItem>
          </OptionsList>
        </ClickAwayListener>
      </CSSTransition>
    </Container>
  );
};

export default ProductCardOptions;
const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  position: relative;
  cursor: pointer;
  background-color: #fff;
`;

const Option = styled.button`
  padding: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.color};
  transition: all 75ms ease;
  &:hover {
    color: ${props => props.theme.headingColor};
    /* font-weight: ${props => props.theme.font.semibold}; */
  }
`;
const OptionText = styled.p`
  margin: 0 0.5rem; ;
`;
const Icon = styled.button`
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  transition: all 75ms ease;
  color: ${props => props.color};
  &:hover {
    background-color: #e6e6e6;
  }
`;
const OptionsList = styled.div`
  position: absolute;
  /* top: -30px; */
  bottom: -20px;
  right: 40px;
  z-index: 10;
  background-color: #fff;
  transform-origin: right;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
`;
const MenuItem = styled.button`
  padding: 0.5rem;
  display: block;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.color};
  transition: all 75ms ease;
  &:hover {
    color: ${props => props.theme.headingColor};
    background-color: ${props => props.theme.highlightColor};
  }
`;
