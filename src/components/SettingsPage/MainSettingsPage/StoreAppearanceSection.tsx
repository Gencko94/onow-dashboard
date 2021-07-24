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
      <Heading tag="h4" color="primary" mb="2rem" weight="semibold">
        Store Appearance
      </Heading>

      <Grid
        cols="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Home Page Appearance"
          cb={() => history.push("/settings/home-appearance")}
          Icon={FcSelfie}
          desc="Edit your Store Homepage"
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
