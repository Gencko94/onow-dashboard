import { FcSettings, FcPositiveDynamic } from "react-icons/fc";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const AccountSection = () => {
  return (
    <Container>
      <Heading tag="h5" color="primary" mb="2rem">
        Account Settings
      </Heading>
      <Grid
        cols="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Account Settings"
          target="/settings/account-settings"
          Icon={FcSettings}
          desc="Preview & Edit Account Information"
        />

        <SettingsCard
          title="Subscription"
          target="/settings/subscription"
          Icon={FcPositiveDynamic}
          desc="Manage your subscription at O-Now "
        />
      </Grid>
    </Container>
  );
};

export default AccountSection;
const Container = styled.div`
  margin: 2rem 0;
`;
