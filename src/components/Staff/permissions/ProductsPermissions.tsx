import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FcTreeStructure } from "react-icons/fc";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import Checkbox from "../../reusable/Checkbox";

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
              <Check
                onChange={(e) => {
                  e.stopPropagation();
                }}
              >
                h
                <input
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                  type="checkbox"
                  checked={allChecked as boolean}
                />
                <span className="check" />
              </Check>
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
const Check = styled.label`
  display: block;
  position: absolute;
  margin: 0;
  top: 10px;
  left: 10px;

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
