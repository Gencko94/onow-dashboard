import { useState } from "react";
import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
export type SEARCH_OPTIONS = "order" | "customer" | "product";
export type PLACEHOLDER_OPTIONS =
  | "Search by Order No, Client No"
  | "Search By Customer Name, Phone Number"
  | "Search for products";

const Searchbar = () => {
  const [option, setOption] = useState<SEARCH_OPTIONS>("customer");
  const [placeholder, setPlaceholder] = useState<PLACEHOLDER_OPTIONS>(
    "Search By Customer Name, Phone Number"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const handleChangeOption = (option: SEARCH_OPTIONS) => {
    setOption(option);
    if (option === "order") {
      setPlaceholder("Search by Order No, Client No");
    } else if (option === "customer") {
      setPlaceholder("Search By Customer Name, Phone Number");
    } else if (option === "product") {
      setPlaceholder("Search for products");
    }
  };
  return (
    <Container>
      <Input placeholder={placeholder} />
      <Options onClick={() => setMenuOpen(!menuOpen)}>
        <SelectedOption>{option}</SelectedOption>
        <BiChevronDown size={19} />
        {menuOpen && (
          <OptionsContainer>
            <Option onClick={() => handleChangeOption("customer")}>
              Customer
            </Option>
            <Option onClick={() => handleChangeOption("order")}>Order</Option>
            <Option onClick={() => handleChangeOption("product")}>
              Product
            </Option>
          </OptionsContainer>
        )}
      </Options>
      <SearchButton>
        <GoSearch size={16} />
      </SearchButton>
    </Container>
  );
};

export default Searchbar;
const Container = styled.div`
  display: grid;
  flex: auto;
  background-color: #fff;
  grid-template-columns: minmax(100px, 1fr) 100px 40px;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 5px;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Options = styled.button`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: ${(props) => props.theme.border};
  border-left: ${(props) => props.theme.border};
  position: relative;
  cursor: pointer;
`;
const SelectedOption = styled.p`
  font-size: 0.8rem;
`;
const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.btnText};
  background-color: ${(props) => props.theme.green};
`;
const OptionsContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 110%;
  left: 0;
  right: 0;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 5px;
  overflow: hidden;
`;
const Option = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: #fff;
  color: ${(props) => props.theme.subHeading};
  transition: all 75ms ease;
  &:hover {
    color: ${(props) => props.theme.headingColor};
    font-weight: ${(props) => props.theme.font.semibold};
  }
`;
