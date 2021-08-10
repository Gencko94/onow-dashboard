import { FcPanorama, FcSelfie } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const StoreAppearanceSection = () => {
  const history = useHistory();
  return (
    <Container>
      <Heading tag="h4" type="normal-heading">
        Store Appearance
      </Heading>

      <Grid
        cols="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Website Page Appearance"
          cb={() => history.push("/settings/website-appearance")}
          Icon={FcSelfie}
          desc="Edit your Website Homepage"
        />
        <SettingsCard
          title="Logo & Favicon"
          cb={() => history.push("/settings/store-logo-favicon")}
          Icon={FcPanorama}
          desc="Edit Store Logo and Favicon"
        />
      </Grid>
    </Container>
  );
};

export default StoreAppearanceSection;
const Container = styled.div`
  margin: 2rem 0;
`;
