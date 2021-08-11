import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Control, Controller, useWatch } from "react-hook-form";
import { CATEGORY } from "../../interfaces/categories/categories";

import { useInfiniteQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Checkbox from "../reusable/Inputs/Checkbox";
import { firstTabInfo } from "../AddProduct/CreateProductGeneralInfo/CreateProductGeneralInfo";
import { NewProductContext } from "../../pages/Product/CreateNewProduct";
import React, { useContext } from "react";
import { getCategories } from "../../utils/queries";
import LoadingTable from "../reusable/LoadingTable";
import DefaultImage from "../reusable/DefaultImage";
import EmptyTable from "../reusable/EmptyTable";
import { useHistory } from "react-router-dom";

interface IProps {
  control: Control<firstTabInfo>;
  errors: boolean;
}
const AddCategoryModalBody = ({ control, errors }: IProps) => {
  const history = useHistory();
  const { formValues } = useContext(NewProductContext);
  const formCategory = useWatch({
    name: "category_id",
    control,
  });

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
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    if (category.id === formCategory) {
      onChange(null);
    } else {
      onChange(category.id);
    }
  }

  return (
    <>
      {data?.pages[0].data.length === 0 && (
        <EmptyTable
          text="No Categories Found"
          height="100%"
          withButton
          btnText="Create New Category"
          cb={() => {
            history.push("/categories/category/create");
          }}
        />
      )}
      <Controller
        control={control}
        name="category_id"
        rules={{
          required: "Required",
        }}
        defaultValue={formValues?.product_category_id}
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
                            <CategoryItem active={formCategory === category.id}>
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
                                checked={formCategory === category.id}
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
                                    checked={formCategory === child.id}
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
    </>
  );
};

export default AddCategoryModalBody;
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

  .table {
    margin: 0 auto;
    /* height: 340px; */
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
    props.active ? props.theme.subtleBackground : "inherit"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};

  .img {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    object-fit: cover;
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
  background-color: ${(props) => props.theme.subtleBackground};
  &:hover {
    background-color: ${(props) => props.theme.subtleBackground};
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
