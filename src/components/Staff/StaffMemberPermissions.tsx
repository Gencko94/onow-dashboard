import { Control } from "react-hook-form";
import styled from "styled-components";
import Heading from "../StyledComponents/Heading";
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
      <Heading tag="h5" color="primary">
        Staff Member Permissions
      </Heading>

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

  .box {
    border-radius: 6px;

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`;
