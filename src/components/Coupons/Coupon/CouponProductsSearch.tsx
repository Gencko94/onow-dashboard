import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import Flex, { FlexWrapper } from "../../StyledComponents/Flex";
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import { searchProducts } from "../../../utils/test-queries";
import { SEARCH_RESULTS_PRODUCT } from "../../../interfaces/search/search";
import ClickAwayListener from "react-click-away-listener";
import Grid from "../../StyledComponents/Grid";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { MINI_PRODUCT } from "../../../interfaces/products/products";
import { Control, Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";

interface IProps {
  control: Control<any>;
  title: string;
}

const CouponProductsSearch = ({ title, control }: IProps) => {
  const { i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const { data, isLoading } = useQuery<SEARCH_RESULTS_PRODUCT>(
    ["product-search", debouncedSearchValue],
    () => searchProducts(debouncedSearchValue),
    { enabled: debouncedSearchValue !== "" }
  );
  const covered_data = useWatch({
    control,
    name: "special_products",
  });
  const handleAddProduct = (product: MINI_PRODUCT, onChange: any) => {
    const found = covered_data.find((i: any) => i.id === product.id);
    if (!found) {
      onChange([...covered_data, product]);
    }
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
          }}
        />
      </Flex>
      <ProductsContainer>
        {searchValue === "" && (
          <div className="no-products">
            <h6>{title}</h6>
          </div>
        )}
        {data?.length === 0 && searchValue !== "" && (
          <div className="no-products">No Products were found</div>
        )}
        {isLoading && (
          <div className="loading">
            <Loader height="30px" width="30px" type="TailSpin" />
            <p>Searching...</p>
          </div>
        )}
        <Controller
          control={control}
          name="special_products"
          render={({ field: { onChange } }) => {
            return (
              <SearchResults>
                {data?.map((item) => (
                  <div
                    className="search-result"
                    onClick={() => handleAddProduct(item, onChange)}
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
            );
          }}
        />
      </ProductsContainer>
    </Container>
  );
};

export default CouponProductsSearch;
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

  .search-result {
    padding: 0.5rem;
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
  background-color: #fff;
`;
const ProductsContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.overlayColor};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  margin: 1rem 0;

  .no-products,
  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading p {
    margin: 0 0.5rem;
  }
  button.icon {
    align-self: center;

    color: ${(props) => props.theme.dangerRed};
  }
`;
