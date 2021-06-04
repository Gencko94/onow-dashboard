import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FcTreeStructure } from "react-icons/fc";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import CheckboxWithLabel from "../../reusable/CheckboxWithLabel";
import Checkbox from "../../reusable/Inputs/Checkbox";

interface IProps {
  control: Control<STAFF_MEMBER>;
  permissions: any;
}
const ProductsPermissions = ({ control, permissions }: IProps) => {
  const { t } = useTranslation();
  const allChecked = useWatch<STAFF_MEMBER>({
    control,
    name: "permissions.products.all",
  });
  return (
    <Container>
      <div className="title">
        <Controller
          control={control}
          name="permissions.products.all"
          render={({ field: { onChange } }) => {
            return (
              <Checkbox
                onChange={(e) => {
                  e.stopPropagation();
                  onChange(e.target.checked);
                }}
                checked={allChecked as boolean}
              />
            );
          }}
        />
        <span className="icon">
          <FcTreeStructure size={50} />
        </span>
        <h6>Products</h6>
      </div>
      <div className="box-content">
        {permissions.products.map((key: any) => {
          return (
            <div className="item">
              <CheckboxWithLabel
                control={control}
                name={`permissions.products.${key}`}
                label={key}
                key={key}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ProductsPermissions;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  .title {
    padding: 0.75rem 0.5rem;
    background-color: ${(props) => props.theme.highlightColor};
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    h6 {
      font-size: 0.9rem;
      margin: 0 2rem;
    }
  }
  .box-content {
    max-height: 200px;
    overflow-y: auto;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0.5rem;
  }
`;
