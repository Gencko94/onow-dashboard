import { Control } from "react-hook-form";
import styled from "styled-components";
import CustomerPermissions from "./permissions/CustomerPermissions";
import OrdersPermissions from "./permissions/OrdersPermissions";
import ProductsPermissions from "./permissions/ProductsPermissions";

interface IProps {
  control: Control<any>;
  permissions: any;
  setValue: any;
}

const StaffMemberPermissions = ({ control, permissions, setValue }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Staff Member Permissions</h5>
      </div>
      <div className="box">
        <div className="grid">
          <CustomerPermissions setValue={setValue} control={control} />
          <OrdersPermissions control={control} setValue={setValue} />
          <ProductsPermissions control={control} setValue={setValue} />
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
