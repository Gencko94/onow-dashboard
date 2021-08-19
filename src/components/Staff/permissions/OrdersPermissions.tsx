import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FcRules } from "react-icons/fc";
import styled from "styled-components";
import { ordersPermissions } from "../../../data/userPermissions";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import CheckToggle from "../../reusable/CheckToggle";
import Heading from "../../StyledComponents/Heading";

interface IProps {
  control: Control<STAFF_MEMBER>;
  setValue: any;
}
const OrdersPermissions = ({ control, setValue }: IProps) => {
  const { t } = useTranslation();
  const permissionsValues: any = useWatch<STAFF_MEMBER>({
    control,
    name: "permissions",
  });
  function checkIfAllChecked() {
    const checked = ordersPermissions.every((i) =>
      permissionsValues.includes(i)
    );

    return checked;
  }
  function checkAllValues() {
    const set = new Set([
      ...permissionsValues,
      "createOrder",
      "deleteOrder",
      "editOrder",
      "visitOrders",
    ]);
    setValue(`permissions`, Array.from(set));
  }
  function unCheckAllValues() {
    setValue(
      `permissions`,
      permissionsValues.filter(
        (i: any) =>
          i !== "createOrder" &&
          i !== "deleteOrder" &&
          i !== "editOrder" &&
          i !== "visitOrders"
      )
    );
  }
  return (
    <Container>
      <div className="title">
        <span className="icon">
          <FcRules size={50} />
        </span>
        <Heading tag="h6" type="small-title">
          Orders
        </Heading>
      </div>
      <div className="box-content">
        <div className="item">
          <CheckToggle
            checked={checkIfAllChecked() ? true : false}
            onChange={(e) => {
              if (checkIfAllChecked()) {
                unCheckAllValues();
              } else {
                checkAllValues();
              }
            }}
            label="Select All"
          />
        </div>
        {ordersPermissions.map((key: any) => {
          return (
            <div className="item">
              <Controller
                control={control}
                name={`permissions`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <CheckToggle
                      label={key}
                      key={key}
                      checked={value.includes(key)}
                      onChange={(e) => {
                        if (value.includes(key)) {
                          onChange(
                            permissionsValues.filter((i: any) => i !== key)
                          );
                        } else {
                          onChange([...permissionsValues, key]);
                        }
                      }}
                    />
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
  background-color: ${(props) => props.theme.subtleBackground};

  .title {
    padding: 0.75rem 0.5rem;

    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }
  .box-content {
    max-height: 300px;
    overflow-y: auto;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.5rem;
  }
`;
