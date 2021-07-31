import { useTranslation } from "react-i18next";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import styled from "styled-components";
import { CATEGORY } from "../../../interfaces/categories/categories";
import Checkbox from "../../reusable/Inputs/Checkbox";

interface ProductCategorySubItemProps {
  child: CATEGORY;
  formCategoryId: number;
  handleToggleCategories: (
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) => void;
  onChange: (...event: any[]) => void;
}

const ProductCategorySubItem = ({
  child,
  formCategoryId,
  handleToggleCategories,
  onChange,
}: ProductCategorySubItemProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <>
      <Container active={formCategoryId === child.id}>
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
            <img src={child.image} alt={child.name[language]} className="img" />
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
      </Container>
      <Children>
        {child?.children?.map((child: CATEGORY) => {
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

export default ProductCategorySubItem;
const Container = styled.div<{ active: boolean }>`
  background-color: #fff;
  display: block;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) =>
    props.active ? props.theme.accent3 : props.theme.accent2};
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
const Children = styled.div`
  padding: 0 0.5rem;
`;
