import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Control, Controller, useWatch } from "react-hook-form";

import { useQuery } from "react-query";

import { useTranslation } from "react-i18next";

import { MINI_CATEGORY } from "../../../interfaces/categories/categories";
import Checkbox from "../../reusable/Inputs/Checkbox";
import Chip from "../../reusable/Chip";
import { getMiniCategories } from "../../../utils/test-queries";

interface IProps {
  control: Control<any>;
  errors: any;
}
const ProductCategoryList = ({ control, errors }: IProps) => {
  const formValues = useWatch({
    control,
  });
  const { data } = useQuery<MINI_CATEGORY[]>(
    "mini-categories",
    getMiniCategories,
    { suspense: true }
  );
  const {
    i18n: { language },
  } = useTranslation();

  function handleToggleCategories(
    category: MINI_CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    const found = formValues.category?.find((i: any) => i.id === category.id);

    if (!found) {
      console.log("found");
      onChange([...formValues.category!, category]);
    } else {
      onChange(formValues?.category?.filter((i: any) => i.id !== category.id));
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
            <div className="chips">
              <p className="text">Selected Categories :</p>
              <div className="chips-wrapper">
                {formValues.category?.map((cat: any) => {
                  return (
                    <Chip
                      key={cat.id}
                      text={cat.name[language]}
                      onClick={(e) => {
                        handleToggleCategories(cat, onChange);
                      }}
                    />
                  );
                })}
                {errors && (
                  <p className="error-message">Please Select a Category</p>
                )}
              </div>
            </div>

            <div className="table">
              {data?.map((category) => {
                return (
                  <div key={category.id}>
                    <CategoryItem>
                      <div
                        className="field"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCategories(category, onChange);
                        }}
                      >
                        <img
                          src={category.image}
                          alt={category.name[language]}
                          className="img"
                        />
                        <h6>{category.name[language]}</h6>
                      </div>
                      <Checkbox
                        checked={Boolean(
                          formValues.category?.find(
                            (i: any) => i.id === category.id
                          )
                        )}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleCategories(category, onChange);
                        }}
                      />
                    </CategoryItem>
                    {category?.children?.map((child) => {
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
                            checked={Boolean(
                              formValues.category?.find(
                                (i: any) => i.id === child.id
                              )
                            )}
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
    border: ${(props) => props.theme.border};
    margin: 0 auto;
    height: 340px;
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

const CategoryItem = styled.div`
  display: block;
  width: 100%;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    /* background-color: ${(props) => props.theme.highlightColor}; */
  }

  .field {
    padding: 0.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    h6 {
      font-size: 0.9rem;
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
