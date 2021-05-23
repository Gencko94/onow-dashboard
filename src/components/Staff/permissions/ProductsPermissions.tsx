import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import Checkbox from "../../reusable/Checkbox";

interface IProps {
  control: Control<STAFF_MEMBER>;
  permissions: any;
}
const ProductsPermissions = ({ control, permissions }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="box-title">
        {/* <div className="checker">
          <input type="checkbox" />
        </div> */}
        <h6>Products</h6>
      </div>
      <div className="box-content">
        {permissions.products.map((key: any) => {
          return (
            <div className="item">
              <Checkbox
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
  .box-title {
    padding: 0.75rem;
    background-color: ${(props) => props.theme.highlightColor};
    display: flex;
    align-items: center;
    border-bottom: ${(props) => props.theme.border};
    h6 {
      margin: 0 0.25rem;
    }
  }
  .box-content {
    max-height: 200px;
    overflow-y: auto;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }
`;
