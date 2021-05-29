import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { QUICK_ADD_CATEGORY } from "../../interfaces/categories/categories";
import { useMemo } from "react";
import IconedInput from "../reusable/IconedInput";
import { BiSearch } from "react-icons/bi";
import Checkbox from "../reusable/Checkbox";
const AddCategoryModalBody = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<QUICK_ADD_CATEGORY> = (data) => {
    console.log(data);
  };
  const cols = useMemo(
    () => [
      { title: "categoryName", sortable: false },
      { title: "productsCount", sortable: false },
      { title: " ", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <IconedInput
        Icon={BiSearch}
        errors={errors?.d}
        name="d"
        placeholder="Search for categories"
        register={register}
      />

      {/* <TableHead cols={cols} /> */}
      <h5 className="table-title">Categories</h5>
      <div className="table">
        {[0, 1, 2].map((i) => {
          return (
            <>
              <CategoryItem>
                <div className="field">
                  <h6>Category Name 1</h6>
                  <Checkbox control={control} name="d" />
                </div>
              </CategoryItem>
              {[0, 1].map((s) => {
                return (
                  <SubCategoryItem>
                    <div className="field">
                      <MdSubdirectoryArrowRight />
                      <h6>SubCategory Name 1</h6>
                    </div>
                  </SubCategoryItem>
                );
              })}
            </>
          );
        })}
      </div>
    </Container>
  );
};

export default AddCategoryModalBody;
const Container = styled.div`
  .table-title {
    padding: 0.5rem;
  }
  .table {
    /* padding: 0.5rem 0; */
    border: ${(props) => props.theme.border};
    /* width: 70%; */
    margin: 0 auto;
    max-height: 271px;
    overflow: auto;
  }
`;

const CategoryItem = styled.div`
  background-color: ${(props) => props.theme.accentColor};

  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    /* background-color: ${(props) => props.theme.highlightColor}; */
  }

  .field {
    display: flex;
    padding: 0.5rem;
    justify-content: space-between;
    h6 {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
`;
const SubCategoryItem = styled.div`
  background-color: #fff;
  gap: 1rem;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.highlightColor};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }

  .field {
    display: flex;
    align-items: center;

    padding: 0.5rem;
    padding-left: 3rem;

    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
`;
