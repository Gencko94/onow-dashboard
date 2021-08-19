import { Control } from "react-hook-form";

import Box from "../reusable/Box/Box";
import Grid from "../StyledComponents/Grid";

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
    <Box type="titled" boxTitle="Staff Member Permissions">
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
        <CustomerPermissions setValue={setValue} control={control} />
        <OrdersPermissions control={control} setValue={setValue} />
        <ProductsPermissions control={control} setValue={setValue} />
      </Grid>
    </Box>
  );
};

export default StaffMemberPermissions;
