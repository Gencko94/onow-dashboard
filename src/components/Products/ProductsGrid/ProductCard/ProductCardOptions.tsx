import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styled from 'styled-components';

const ProductCardOptions = () => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  return (
    <Container>
      <Options onClick={() => setOptionsMenuOpen(!optionsMenuOpen)}>
        {/* <SelectedOption>{option}</SelectedOption> */}
        <BiChevronDown size={19} />
        {optionsMenuOpen && (
          <OptionsContainer>
            {/* <Option onClick={() => handleChangeOption('Customer')}>
              Customer
            </Option> */}
            {/* <Option onClick={() => handleChangeOption('Order')}>Order</Option> */}
          </OptionsContainer>
        )}
      </Options>
    </Container>
  );
};

export default ProductCardOptions;
const Container = styled.div`
  padding: 0.5rem;
`;
const Options = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: ${props => props.theme.border};
  border-left: ${props => props.theme.border};
  position: relative;
  cursor: pointer;
`;
const SelectedOption = styled.p`
  font-size: 0.8rem;
`;
const OptionsContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 110%;
  left: 0;
  right: 0;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  overflow: hidden;
`;
const Option = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: #fff;
  color: ${props => props.theme.subHeading};
  transition: all 75ms ease;
  &:hover {
    color: ${props => props.theme.headingColor};
    font-weight: ${props => props.theme.font.semibold};
  }
`;
