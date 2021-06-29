import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import Flex, { FlexWrapper } from "../../StyledComponents/Flex";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery, useQuery } from "react-query";
import Grid from "../../StyledComponents/Grid";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { PRODUCT } from "../../../interfaces/products/products";
import { Control, Controller } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { searchProducts } from "../../../utils/queries";
import DefaultImage from "../../reusable/DefaultImage";

interface IProps {
  control: Control<any>;
  title: string;
}

const CouponProductsSearch = ({ title, control }: IProps) => {
  const { i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  // const { data, isLoading } = useQuery<SEARCH_RESULTS_PRODUCT>(
  //   ["product-search", debouncedSearchValue],
  //   () => searchProducts(debouncedSearchValue),
  //   { enabled: debouncedSearchValue !== "" }
  // );
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["search-products", debouncedSearchValue],
    ({ pageParam = 1 }) => searchProducts(debouncedSearchValue, pageParam),
    {
      keepPreviousData: true,
      enabled: Boolean(debouncedSearchValue),

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const covered_data = useWatch({
    control,
    name: "special_products",
  });
  const handleAddProduct = (product: PRODUCT, onChange: any) => {
    console.log(covered_data);
    const found = covered_data.find((i: PRODUCT) => i.id === product.id);
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
        {data?.pages[0].data.length === 0 && searchValue !== "" && (
          <div className="no-products">No Products were found</div>
        )}
        {isFetching && (
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
                {data?.pages.map((group, i) => {
                  return (
                    <React.Fragment key={i}>
                      {group.data.map((product: PRODUCT) => (
                        <div
                          className="search-result"
                          onClick={() => handleAddProduct(product, onChange)}
                        >
                          <Grid cols="50px 1fr" gap="0.25rem">
                            {product.image ? (
                              <img
                                className="img"
                                src={product.image}
                                alt={product.name[i18n.language]}
                              />
                            ) : (
                              <DefaultImage
                                circular
                                border
                                height="50px"
                                width="50px"
                              />
                            )}
                            <div className="info">
                              <p className="name">
                                {product.name[i18n.language]}
                              </p>
                              <p className="price">{product.price}</p>
                            </div>
                          </Grid>
                        </div>
                      ))}
                    </React.Fragment>
                  );
                })}
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
    .img {
      height: 50px;
      width: 50px;
      border-radius: 50px;
      object-fit: cover;
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
