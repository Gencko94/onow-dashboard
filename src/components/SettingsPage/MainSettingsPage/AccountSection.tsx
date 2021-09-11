import { FcSettings, FcPositiveDynamic } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const AccountSection = () => {
  const history = useHistory();
  return (
    <Container>
      <Heading tag="h4" type="normal-heading">
        Account Settings
      </Heading>
      <Grid
        columns="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Account Settings"
          cb={() => history.push("settings/account-settings")}
          Icon={FcSettings}
          desc="Preview & Edit Account Information"
        />

        <SettingsCard
          title="Subscription"
          cb={() => history.push("/settings/subscription")}
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
