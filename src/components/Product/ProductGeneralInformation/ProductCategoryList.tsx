import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Control, Controller, useWatch } from "react-hook-form";

import { useInfiniteQuery, useQuery } from "react-query";

import { useTranslation } from "react-i18next";

import {
  CATEGORY,
  MINI_CATEGORY,
} from "../../../interfaces/categories/categories";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { getMiniCategories } from "../../../utils/test-queries";
import { getCategories } from "../../../utils/queries";
import DefaultImage from "../../reusable/DefaultImage";
import LoadingTable from "../../reusable/LoadingTable";
import React from "react";

interface IProps {
  control: Control<any>;
  errors: any;
}
const ProductCategoryList = ({ control, errors }: IProps) => {
  const formValues = useWatch({
    control,
  });
  console.log(formValues);
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "categories",
    ({ pageParam = 1 }) => getCategories(pageParam),
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
    category: MINI_CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    const found = formValues.category?.id === category.id;

    console.log(formValues);
    // console.log(found);
    if (found) {
      console.log("found");
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
                          <CategoryItem
                            active={formValues.category?.id === category.id}
                          >
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
                                  height="50px"
                                  width="50px"
                                />
                              )}
                              <h6>{category.name[language]}</h6>
                            </div>
                            <Checkbox
                              checked={formValues.category?.id === category.id}
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
                                    <MdSubdirectoryArrowRight />
                                    <img
                                      src={child.image}
                                      alt={child.name[language]}
                                      className="img"
                                    />
                                    <h6>{child.name[language]}</h6>
                                  </div>
                                </div>
                                <Checkbox
                                  checked={formValues.category?.id === child.id}
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
      }}
    />
  );
};

export default ProductCategoryList;
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
  .chips {
    display: flex;

    gap: 0.5rem;
    .text {
      padding: 0.75rem 0.5rem;
      background-color: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.subHeading};
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
    /* background-color: ${(props) => props.theme.highlightColor}; */
  }
  .img {
    border-radius: 50%;
    width: 25px;
    object-fit: cover;
    height: 25px;
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
  background-color: ${(props) => props.theme.highlightColor};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    padding-left: 2rem;
    flex: 1;

    .title {
      display: flex;
      align-items: center;
    }
    h6 {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
`;
