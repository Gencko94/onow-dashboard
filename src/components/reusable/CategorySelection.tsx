import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Control, Controller, useWatch } from "react-hook-form";

import { useInfiniteQuery } from "react-query";

import { useTranslation } from "react-i18next";

import React from "react";
import Checkbox from "./Inputs/Checkbox";
import { CATEGORY } from "../../interfaces/categories/categories";
import DefaultImage from "./DefaultImage";
import LoadingTable from "./LoadingTable";
import { getCategories } from "../../utils/queries";
import EmptyTable from "./EmptyTable";

interface IProps {
  formCategoryId: number;
  errors: any;
  onChange: (...event: any[]) => void;
}
const CategorySelection = ({ errors, formCategoryId, onChange }: IProps) => {
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
    <Container>
      <div className="table">
        {status === "loading" && <LoadingTable />}
        {data?.pages[0].data.length === 0 && (
          <EmptyTable text="No Categories Found" height="100%" />
        )}
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.data.map((category: CATEGORY) => {
                return (
                  <div key={category.id}>
                    <CategoryItem active={formCategoryId === category.id}>
                      <div
                        className="field"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCategories(category, onChange);
                        }}
                      >
                        {category.image ? (
                          <img
                            className="img"
                            src={category.image}
                            alt={category.name[language]}
                          />
                        ) : (
                          <DefaultImage
                            circular
                            border
                            height="35px"
                            width="35px"
                          />
                        )}
                        <h6>{category.name[language]}</h6>
                      </div>
                      <Checkbox
                        checked={formCategoryId === category.id}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleCategories(category, onChange);
                        }}
                      />
                    </CategoryItem>
                    {category?.children?.map((child: CATEGORY) => {
                      return (
                        <SubCategoryItem key={child.id}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCategories(child, onChange);
                            }}
                            className="field"
                          >
                            <div className="title">
                              <span className="icon">
                                <MdSubdirectoryArrowRight />
                              </span>
                              <img
                                src={child.image}
                                alt={child.name[language]}
                                className="img"
                              />
                              <h6>{child.name[language]}</h6>
                            </div>
                          </div>
                          <Checkbox
                            checked={formCategoryId === child.id}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleToggleCategories(child, onChange);
                            }}
                          />
                        </SubCategoryItem>
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </Container>
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

const CategoryItem = styled.div<{ active: boolean }>`
  display: block;
  width: 100%;
  background-color: ${(props) =>
    props.active ? props.theme.accentColor : "#fff"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.accent1};
  }

  .field {
    padding: 0.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    h6 {
      font-size: 0.9rem;
      margin: 0 0.5rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
`;
const SubCategoryItem = styled.div`
  background-color: #fff;
  display: block;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.accent1};
  &:hover {
    background-color: ${(props) => props.theme.accent2};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    padding-left: 0.5rem;
    flex: 1;

    .title {
      display: flex;
      align-items: center;
    }
    h6 {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.semibold};
      margin: 0 0.5rem;
    }
    .icon {
      margin: 0 0.5rem;
    }
  }
`;
