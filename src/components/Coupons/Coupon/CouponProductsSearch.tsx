import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import Flex from "../../StyledComponents/Flex";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "react-query";
import Grid from "../../StyledComponents/Grid";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { PRODUCT } from "../../../interfaces/products/products";
import { Control, Controller } from "react-hook-form";

import { searchProducts } from "../../../utils/queries/productQueries";
import DefaultImage from "../../reusable/DefaultImage";
import Heading from "../../StyledComponents/Heading";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  control: Control<any>;
  title: string;
  handleAddProduct: (p: PRODUCT) => void;
}

const CouponProductsSearch = ({ title, control, handleAddProduct }: IProps) => {
  const { i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const {
    data,
    status,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["search-products", debouncedSearchValue],
    ({ pageParam = 1 }) => searchProducts(debouncedSearchValue, pageParam),
    {
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

  return (
    <Container>
      <div className="head">
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
      </div>
      <ProductsContainer>
        {searchValue === "" && (
          <div className="no-products">
            <Heading tag="h6">{title}</Heading>
          </div>
        )}
        {data?.pages[0].data.length === 0 && searchValue !== "" && (
          <div className="no-products">
            <Heading tag="h6">No Products were found</Heading>
          </div>
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
              <div>
                {data?.pages.map((group, i) => {
                  return (
                    <React.Fragment key={i}>
                      {group.data.map((product: PRODUCT) => (
                        <div
                          className="search-result"
                          onClick={() => handleAddProduct(product)}
                        >
                          <Grid columns="50px 1fr" gap="0.25rem">
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
                              <Paragraph weight="semibold">
                                {product.price}
                              </Paragraph>
                            </div>
                          </Grid>
                        </div>
                      ))}
                    </React.Fragment>
                  );
                })}
              </div>
            );
          }}
        />
      </ProductsContainer>
    </Container>
  );
};

export default CouponProductsSearch;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: ${(props) => props.theme.accent2};

  ${Flex} {
    position: relative;
    border-radius: 6px;
    box-shadow: ${(props) => props.theme.shadow};
    background-color: ${(props) => props.theme.accent1};
  }
  span.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
  }
  input {
    flex: auto;
    min-width: 50px;
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  .search-result {
    padding: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    border-bottom: ${(props) => props.theme.border};
    &:hover {
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

const ProductsContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  border-radius: 6px;
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
