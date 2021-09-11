import { CUSTOMER } from "../../interfaces/customers/customers";

import Box from "../reusable/Box/Box";
import DataField from "../reusable/DataField";
import Grid from "../StyledComponents/Grid";
import Spacer from "../reusable/Spacer";
interface IProps {
  data: CUSTOMER;
}

const CustomerProfileInfo = ({ data }: IProps) => {
  return (
    <Box type="titled" boxTitle="Customer Personal Info">
      <Grid columns="repeat(auto-fit,minmax(280px,1fr))" gap="1rem">
        <DataField label="First Name">{data.first_name}</DataField>
        <DataField label="Last Name">{data.last_name}</DataField>
      </Grid>
      <Spacer size={16} />
      <Grid columns="repeat(auto-fit,minmax(280px,1fr))" gap="1rem">
        <DataField label="Phone Number">{data.phone}</DataField>
        <DataField label="Email Address">{data.email}</DataField>
      </Grid>
    </Box>
  );
};

export default CustomerProfileInfo;
