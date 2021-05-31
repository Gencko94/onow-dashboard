import { Control } from "react-hook-form";
import styled from "styled-components";
import { STAFF_MEMBER, STAFF_PERMISSIONS } from "../../interfaces/staff/staff";
import CustomerPermissions from "./permissions/CustomerPermissions";
import OrdersPermissions from "./permissions/OrdersPermissions";
import ProductsPermissions from "./permissions/ProductsPermissions";

interface IProps {
  control: Control<STAFF_MEMBER>;
  permissions: any;
}

const StaffMemberPermissions = ({ control, permissions }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Staff Member Permissions</h5>
      </div>
      <div className="box">
        <div className="grid">
          <CustomerPermissions permissions={permissions} control={control} />
          <OrdersPermissions control={control} permissions={permissions} />
          <ProductsPermissions control={control} permissions={permissions} />
        </div>
      </div>
    </Container>
  );
};

export default StaffMemberPermissions;
const Container = styled.div`
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${(props) => props.theme.mainColor};
  }
  .box {
    border-radius: 6px;

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`;
