import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { GiFrenchFries } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import ProductsPanelActions from "./ProductsPanelActions/ProductPanelActions";
import { useHistory } from "react-router";
import ClickAwayListener from "react-click-away-listener";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { PRODUCT_TYPE } from "../../../interfaces/products/products";
import AddButton from "../../reusable/AddButton";
const ProductsPanel = () => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const productTypes: PRODUCT_TYPE[] = [
    {
      id: 1,
      name: "Ready",
      description: {
        en: "Ready to be Shipped Products",
        ar: "المنتجات الجاهزة للشحن",
      },
    },
    {
      id: 2,
      name: "Food",
      description: {
        en: "Food that required prepration Time",
        ar: "المأكولات التي تتطلب وقتا للتحضير",
      },
    },
  ];
  const history = useHistory();
  return (
    <Container>
      <AddButton target="/products/product/create" title="Create new Product" />
      {/* <AddProductButton onClick={() => setOptionsMenuOpen(true)}>
        <Icon>
          <BiPlus size={30} />
        </Icon>
        <AddText>Add New Product</AddText>
      </AddProductButton>
      <CSSTransition
        in={optionsMenuOpen}
        classNames="menu"
        unmountOnExit
        timeout={100}
      >
        <ClickAwayListener onClickAway={() => setOptionsMenuOpen(false)}>
          <OptionsList>
            <MenuItem
              onClick={() => history.push({ pathname: "/products/new/food" })}
            >
              <Icon>
                <GiFrenchFries size={20} />
              </Icon>
              <OptionNameContainer>
                <OptionText>Food</OptionText>
                <OptionDesc>Special Shipping Food</OptionDesc>
              </OptionNameContainer>
            </MenuItem>
            <MenuItem
              onClick={() => history.push({ pathname: "/products/new/ready" })}
            >
              <Icon>
                <GoPackage size={20} />
              </Icon>
              <OptionNameContainer>
                <OptionText>Ready</OptionText>
                <OptionDesc>Ready to be shipped Product</OptionDesc>
              </OptionNameContainer>
            </MenuItem>
          </OptionsList>
        </ClickAwayListener>
      </CSSTransition> */}
      <ProductsPanelActions />
    </Container>
  );
};

export default ProductsPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const AddProductButton = styled.button`
  background-color: ${(props) => props.theme.green};
  box-shadow: ${(props) => props.theme.shadow};
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
const AddText = styled.p`
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.regular};
  margin: 0 0.5rem;
`;
const OptionNameContainer = styled.div`
  margin: 0 0.5rem;
`;
const OptionText = styled.p``;
const OptionDesc = styled.p`
  color: ${(props) => props.theme.subHeading};
  font-size: 0.8rem;
`;
const OptionsList = styled.div`
  position: absolute;
  /* top: 100%; */
  bottom: -50px;
  left: 20px;
  z-index: 10;
  background-color: #fff;
  /* transform-origin: top right; */
  box-shadow: ${(props) => props.theme.shadow};
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
  color: ${(props) => props.color};
  overflow: hidden;
  transition: all 75ms ease;
  &:hover {
    color: ${(props) => props.theme.headingColor};
    background-color: ${(props) => props.theme.highlightColor};
  }
`;
