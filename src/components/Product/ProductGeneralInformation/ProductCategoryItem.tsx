import { useTranslation } from "react-i18next";
import styled from "styled-components";

// import CategorySelectionSubItem from "./CategorySelectionSubItem";
import { CATEGORY } from "../../../interfaces/categories/categories";
import Checkbox from "../../reusable/Inputs/Checkbox";
import DefaultImage from "../../reusable/DefaultImage";
import ProductCategorySubItem from "./ProductCategorySubItem";

interface ProductCategoryItemProps {
  category: CATEGORY;
  formCategoryId: number;
  handleToggleCategories: (
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) => void;
  onChange: (...event: any[]) => void;
}

const ProductCategoryItem = ({
  category,
  formCategoryId,
  handleToggleCategories,
  onChange,
}: ProductCategoryItemProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <>
      <Container active={formCategoryId === category.id}>
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
            <DefaultImage circular border height="35px" width="35px" />
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
      </Container>
      <Children>
        {category?.children?.map((child: CATEGORY) => {
          return (
            <ProductCategorySubItem
              child={child}
              formCategoryId={formCategoryId}
              handleToggleCategories={handleToggleCategories}
              onChange={onChange}
            />
          );
        })}
      </Children>
    </>
  );
};

export default ProductCategoryItem;
const Container = styled.div<{ active: boolean }>`
  display: block;
  width: 100%;
  background-color: ${(props) =>
    props.active ? props.theme.subtleBackground : "inherit"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.subtleBackground};
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
const Children = styled.div`
  padding: 0 0.55rem;
`;
