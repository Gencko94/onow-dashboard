import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import { searchProducts } from "../../../../utils/test-queries";
import { SEARCH_RESULTS_PRODUCT } from "../../../../interfaces/search/search";
import ClickAwayListener from "react-click-away-listener";
import Grid from "../../../StyledComponents/Grid";
import { useTranslation } from "react-i18next";

import { MINI_PRODUCT } from "../../../../interfaces/products/products";
import { BsCheck } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
interface IProps {
  onChange: (...event: any[]) => void;
  closeFunction: () => void;
}

const AddProductsModal = ({ onChange, closeFunction }: IProps) => {
  const { i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [products, setProducts] = useState<MINI_PRODUCT[]>([]);

  const { data, isLoading } = useQuery<SEARCH_RESULTS_PRODUCT>(
    ["product-search", debouncedSearchValue],
    () => searchProducts(debouncedSearchValue),
    { enabled: debouncedSearchValue !== "" }
  );
  useEffect(() => {
    if (data) setSearchResultsOpen(true);
  }, [data]);
  const handleAddProduct = (product: MINI_PRODUCT) => {
    setProducts((prev) => [...prev, product]);
    setSearchResultsOpen(false);
  };
  const handleRemoveProduct = (id: number) => {
    setProducts((prev) => prev.filter((i) => i.id !== id));
  };
  return (
    <Container>
      <Flex>
        <span className="icon">
          <GoSearch />
        </span>
        <input
          placeholder="Search For products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => {
            if (!data) return;
            setSearchResultsOpen(true);
          }}
        />
        {searchResultsOpen && (
          <ClickAwayListener onClickAway={() => setSearchResultsOpen(false)}>
            <SearchResults>
              {isLoading && "loading"}
              {data?.length === 0 && "no Search Results"}
              {data?.map((item) => (
                <div
                  className="search-result"
                  onClick={() => handleAddProduct(item)}
                >
                  <Grid cols="50px 1fr" gap="0.25rem">
                    <img src={item.image} alt={item.name[i18n.language]} />
                    <div className="info">
                      <p className="name">{item.name[i18n.language]}</p>
                      <p className="price">{item.price}</p>
                    </div>
                  </Grid>
                </div>
              ))}
            </SearchResults>
          </ClickAwayListener>
        )}
      </Flex>
      <ProductsContainer>
        {products.length === 0 && (
          <div className="no-products">
            <h6>Search For Products to add them</h6>
          </div>
        )}
        {products.map((product) => (
          <div className="search-result">
            <Grid cols="50px 1fr 50px" gap="0.25rem">
              <img src={product.image} alt={product.name[i18n.language]} />
              <div className="info">
                <p className="name">{product.name[i18n.language]}</p>
                <p className="price">{product.price}</p>
              </div>
              <button
                type="button"
                className="icon"
                onClick={() => handleRemoveProduct(product.id)}
              >
                <MdCancel size={25} />
              </button>
            </Grid>
          </div>
        ))}
      </ProductsContainer>
      <div className="btns-container">
        <button
          className="green"
          type="button"
          onClick={() => {
            onChange(products);
            closeFunction();
          }}
        >
          <BsCheck size={30} />
          <p>Confirm</p>
        </button>
        <button className="red" type="button" onClick={() => closeFunction()}>
          <MdCancel size={30} />
          <p>Cancel</p>
        </button>
      </div>
    </Container>
  );
};

export default AddProductsModal;
const Container = styled.div`
  padding: 0.5rem;
  width: 500px;
  ${FlexWrapper} {
    position: relative;
    border-radius: 6px;
    box-shadow: ${(props) => props.theme.shadow};
  }
  span.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
  }
  input {
    flex: auto;
    padding: 0.4rem;
    font-size: 0.9rem;
  }
  .btns-container {
    display: flex;
    align-items: center;
    border-top: ${(props) => props.theme.border};
    justify-content: space-between;
    padding: 0.5rem 0;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.5rem;
      border-radius: 7px;
      color: ${(props) => props.theme.btnText};
      p {
        margin: 0 0.5rem;
        font-size: 0.9rem;
      }
    }
    .green {
      background-color: ${(props) => props.theme.green};
    }
    .red {
      background-color: ${(props) => props.theme.dangerRed};
    }
  }
  .search-result {
    padding: 0.5rem 0;
    overflow: hidden;
    cursor: pointer;
    border-bottom: ${(props) => props.theme.border};
    &:hover {
      background-color: ${(props) => props.theme.highlightColor};
    }
    .info {
      padding: 0.25rem;
      .name {
        font-size: 0.8rem;
        font-weight: ${(props) => props.theme.font.semibold};
      }
      .price {
        font-size: 0.8rem;
        font-weight: ${(props) => props.theme.font.semibold};
        color: ${(props) => props.theme.green};
      }
    }
  }
`;
const SearchResults = styled.div`
  position: absolute;
  top: 125%;
  left: 0;
  right: 0;
  background-color: #fff;

  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
`;
const ProductsContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.overlayColor};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  margin: 1rem 0;

  .no-products {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button.icon {
    align-self: center;

    color: ${(props) => props.theme.dangerRed};
  }
`;
