import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FcConferenceCall } from "react-icons/fc";
import styled from "styled-components";
import { customerPermissions } from "../../../data/userPermissions";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import CheckToggle from "../../reusable/CheckToggle";

interface IProps {
  control: Control<STAFF_MEMBER>;
  setValue: any;
}
const CustomerPermissions = ({ control, setValue }: IProps) => {
  const { t } = useTranslation();
  const permissionsValues: any = useWatch<STAFF_MEMBER>({
    control,
    name: "permissions",
  });

  function checkIfAllChecked() {
    const checked = customerPermissions.every((i) =>
      permissionsValues.includes(i)
    );
    return checked;
  }
  function checkAllValues() {
    const set = new Set([
      ...permissionsValues,
      "createCustomer",
      "deleteCustomer",
      "editCustomer",
      "visitCustomers",
    ]);
    setValue(`permissions`, Array.from(set));
  }
  function unCheckAllValues() {
    setValue(
      `permissions`,
      permissionsValues.filter(
        (i: any) =>
          i !== "createCustomer" &&
          i !== "deleteCustomer" &&
          i !== "editCustomer" &&
          i !== "visitCustomers"
      )
    );
  }
  return (
    <Container>
      <div className="title">
        <span className="icon">
          <FcConferenceCall size={50} />
        </span>
        <h6>Customers</h6>
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
        <Controller
          control={control}
          name="permissions"
          render={({ field: { onChange, value } }) => {
            return (
              <div>
                {customerPermissions.map((key: any) => {
                  return (
                    <div key={key} className="item">
                      <CheckToggle
                        label={key}
                        checked={permissionsValues.includes(key)}
                        onChange={(e) => {
                          if (permissionsValues.includes(key)) {
                            console.log("remove");
                            setValue(
                              "permissions",
                              permissionsValues.filter((i: any) => i !== key)
                            );
                          } else {
                            console.log("add", [...permissionsValues, key]);
                            setValue("permissions", [
                              ...permissionsValues,
                              key,
                            ]);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        {/* {customerPermissions.map((key: any) => {
          return (
            <div key={key} className="item">
              <Controller
                control={control}
                name="permissions"
                render={({ field: { onChange, value } }) => {
                  return (
                    <CheckToggle
                      label={key}
                      key={key}
                      checked={value.includes(key)}
                      onChange={(e) => {
                        if (value.includes(key)) {
                          console.log("remove");
                          onChange(
                            permissionsValues.filter((i: any) => i !== key)
                          );
                        } else {
                          console.log("add", [...permissionsValues, key]);
                          onChange(["create"]);
                        }
                      }}
                    />
                  );
                }}
              />
            </div>
          );
        })} */}
      </div>
    </Container>
  );
};

export default CustomerPermissions;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
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
      margin: 0 2rem;
      font-size: 0.9rem;
    }
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
