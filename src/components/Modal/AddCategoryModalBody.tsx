import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Control, Controller, SetFieldValue, useWatch } from "react-hook-form";
import { MINI_CATEGORY } from "../../interfaces/categories/categories";

import Chip from "../reusable/Chip";
import { useQuery } from "react-query";
import { getMiniCategories } from "../../utils/test-queries";
import { useTranslation } from "react-i18next";
import ModalTail from "../reusable/ModalTail";

interface IProps {
  closeFunction: () => void;
  setValue: SetFieldValue<any>;
  control: Control<any>;
}
const AddCategoryModalBody = ({ closeFunction, setValue, control }: IProps) => {
  const categories = useWatch({
    control,
    name: "category_id",
  });

  const { data } = useQuery<MINI_CATEGORY[]>(
    "mini-categories",
    getMiniCategories,
    { suspense: true }
  );
  const {
    i18n: { language },
  } = useTranslation();

  const handleToggleCategories = (
    category: MINI_CATEGORY,
    onChange: (...event: any[]) => void
  ) => {
    const found = categories.find((i: any) => i.id === category.id);

    if (!found) {
      onChange([...categories, category]);
    } else {
      onChange(categories.filter((i: any) => i.id !== category.id));
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="category_id"
        render={({ field: { onChange } }) => {
          return (
            <Container>
              <h5 className="table-title">Categories</h5>
              <div className="chips">
                <p className="text">Selected Categories:</p>
                <div className="chips-wrapper">
                  {categories.map((cat: any) => {
                    return (
                      <Chip
                        key={cat.id}
                        text={cat.name[language]}
                        cb={() => {}}
                      />
                    );
                  })}
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
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleCategories(category, onChange);
                          }}
                        >
                          h
                          <input
                            type="checkbox"
                            checked={Boolean(
                              categories.find((i: any) => i.id === category.id)
                            )}
                          />
                          <span className="check" />
                        </Checkbox>
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
                              onChange={(e) => {
                                e.stopPropagation();
                                handleToggleCategories(child, onChange);
                              }}
                            >
                              h
                              <input
                                type="checkbox"
                                checked={Boolean(
                                  categories.find((i: any) => i.id === child.id)
                                )}
                              />
                              <span className="check" />
                            </Checkbox>
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

      <ModalTail
        btnText="Confirm"
        successCb={() => {
          closeFunction();
        }}
        closeFunction={closeFunction}
      />
    </>
  );
};

export default AddCategoryModalBody;
const Container = styled.div`
  .table-title {
    padding: 1rem;
    color: ${(props) => props.theme.mainColor};
    border-bottom: ${(props) => props.theme.border};
  }
  .chips {
    display: flex;

    gap: 0.5rem;
    .text {
      padding: 0.5rem 0.25rem;
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
const Checkbox = styled.label`
  display: block;
  position: relative;
  margin: 0 2rem;

  cursor: pointer;
  font-size: 0.9rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .check {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: #fff;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 7px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  input:checked ~ .check {
    background-color: ${(props) => props.theme.mainColor};
  }
  input:checked ~ .check:after {
    display: block;
  }
`;
