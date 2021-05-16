import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";

interface IProps {
  control: Control<STAFF_MEMBER>;
  permissions: any;
}
const OrdersPermissions = ({ control, permissions }: IProps) => {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="box-title">
        {/* <div className="checker">
          <input type="checkbox" />
        </div> */}
        <h6>Orders</h6>
      </div>
      <div className="box-content">
        {permissions.orders.map((key: any) => {
          return (
            <div className="item">
              <Controller
                defaultValue={false}
                control={control}
                name={`permissions.orders.${key}` as any}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Checkbox>
                      {t(key)}
                      <input
                        type="checkbox"
                        onChange={onChange}
                        checked={value}
                      />
                      <span className="check" />
                    </Checkbox>
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default OrdersPermissions;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;

  .box-title {
    padding: 0.75rem;
    background-color: ${(props) => props.theme.highlightColor};
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
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
const Checkbox = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;

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
    height: 20px;
    width: 20px;
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
    background-color: #2196f3;
  }
  input:checked ~ .check:after {
    display: block;
  }
`;
