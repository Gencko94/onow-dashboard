import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FcConferenceCall } from "react-icons/fc";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../../interfaces/staff/staff";
import CheckToggle from "../../reusable/CheckToggle";

interface IProps {
  control: Control<STAFF_MEMBER>;
  permissions: any;
  setValue: any;
}
const CustomerPermissions = ({ control, permissions, setValue }: IProps) => {
  const { t } = useTranslation();
  const permissionsValues: any = useWatch<STAFF_MEMBER>({
    control,
    name: "permissions.customers",
  });

  function checkIfAllChecked() {
    let allChecked = true;
    Object.keys(permissionsValues).map((entry) => {
      console.log(permissionsValues[entry]);
      if (permissionsValues[entry] === false) {
        allChecked = false;
      }
    });
    return allChecked;
  }
  function checkAllValues() {
    Object.keys(permissionsValues).forEach((value: any) => {
      setValue(`permissions.customers.${value}`, true);
    });
  }
  function unCheckAllValues() {
    Object.keys(permissionsValues).forEach((value: any) => {
      setValue(`permissions.customers.${value}`, false);
    });
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
        {permissions.customers.map((key: any) => {
          return (
            <div className="item">
              <Controller
                control={control}
                name={`permissions.customers.${key}` as any}
                render={({ field: { value, onChange } }) => {
                  return (
                    <CheckToggle
                      label={key}
                      key={key}
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
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
