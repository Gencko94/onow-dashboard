import styled from "styled-components";

import { Control, Controller, useWatch } from "react-hook-form";

import { useInfiniteQuery } from "react-query";

import {
  CATEGORY,
  MINI_CATEGORY,
} from "../../../interfaces/categories/categories";
import { getPaginatedCategories } from "../../../utils/queries/categoriesQueries";
import LoadingTable from "../../reusable/LoadingTable";
import React from "react";
import ProductCategoryItem from "./ProductCategoryItem";

interface IProps {
  control: Control<any>;
  errors: any;
}
const ProductCategoryList = ({ control, errors }: IProps) => {
  const formValues = useWatch({
    control,
  });

  const { data, status } = useInfiniteQuery(
    "categories",
    ({ pageParam = 1 }) => getPaginatedCategories(pageParam),
    {
      keepPreviousData: true,

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const categoryId = formValues.category?.id;
  function handleToggleCategories(
    category: MINI_CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    const found = formValues.category?.id === category.id;

    // console.log(found);
    if (found) {
      onChange(null);
    } else {
      onChange({ name: category.name.en, id: category.id });
    }
  }

  return (
    <Controller
      control={control}
      name="category"
      rules={{
        required: "Required",
      }}
      render={({ field: { onChange } }) => {
        return (
          <Container>
            <div className="table">
              {status === "loading" && <LoadingTable />}
              {data?.pages.map((group, i) => {
                return (
                  <React.Fragment key={i}>
                    {group.data.map((category: CATEGORY) => {
                      return (
                        <div key={category.id}>
                          <ProductCategoryItem
                            category={category}
                            formCategoryId={categoryId}
                            handleToggleCategories={handleToggleCategories}
                            onChange={onChange}
                          />
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </Container>
        );
      }}
    />
  );
};

export default ProductCategoryList;
const Container = styled.div`
  .table-title {
    padding: 1rem;
    color: ${(props) => props.theme.primary};
    border-bottom: ${(props) => props.theme.border};
  }
  .error-message {
    color: ${(props) => props.theme.dangerRed};
    font-size: 0.9rem;
  }
  .chips {
    display: flex;

    gap: 0.5rem;
    .text {
      padding: 0.75rem 0.5rem;
      background-color: ${(props) => props.theme.accent1};
      color: ${(props) => props.theme.textAlt};
      font-size: 0.9rem;
    }
    .chips-wrapper {
      padding: 0.5rem 0.25rem;

      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .table {
    margin: 0 auto;
    max-height: 100%;
    overflow: auto;
    .img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: ${(props) => props.theme.border};
      margin: 0 0.5rem;
    }
  }
`;
