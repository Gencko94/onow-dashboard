import styled from "styled-components";

import { useInfiniteQuery } from "react-query";

import { useTranslation } from "react-i18next";

import React from "react";

import { CATEGORY } from "../../interfaces/categories/categories";

import LoadingTable from "./LoadingTable";
import { getCategories } from "../../utils/queries";
import EmptyTable from "./EmptyTable";
import CategorySelectionItem from "../Categories/CategorySelectionItem";

interface IProps {
  formCategoryId: number;
  errors: any;
  onChange: (...event: any[]) => void;
  currentId: number;
}
const CategorySelection = ({
  errors,
  formCategoryId,
  onChange,
  currentId,
}: IProps) => {
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "categories",
    ({ pageParam = 1 }) => getCategories(pageParam, 5000),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  const {
    i18n: { language },
  } = useTranslation();

  function handleToggleCategories(
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    const found = formCategoryId === category.id;

    // console.log(found);
    if (found) {
      console.log("found");
      onChange(null);
    } else {
      onChange(category.id);
    }
  }

  return (
    <>
      {data?.pages[0].data.length === 0 && (
        <EmptyTable text="No Categories Found" height="100%" />
      )}
      <Container>
        <div className="table">
          {status === "loading" && <LoadingTable />}
          {}
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((category: CATEGORY) => {
                  if (category.id === currentId) return null;
                  return (
                    <div key={category.id}>
                      <CategorySelectionItem
                        category={category}
                        formCategoryId={formCategoryId}
                        handleToggleCategories={handleToggleCategories}
                        onChange={onChange}
                        currentId={currentId}
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default CategorySelection;
const Container = styled.div`
  .table-title {
    padding: 1rem;
    color: ${(props) => props.theme.mainColor};
    border-bottom: ${(props) => props.theme.border};
  }
  .error-message {
    color: ${(props) => props.theme.dangerRed};
    font-size: 0.9rem;
  }

  .table {
    margin: 0 auto;
    height: 100%;
    overflow: auto;
    .img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      border: ${(props) => props.theme.border};
    }
  }
`;
