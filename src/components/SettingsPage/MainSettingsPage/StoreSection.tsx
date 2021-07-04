import {
  FcPanorama,
  FcGlobe,
  FcInTransit,
  FcMoneyTransfer,
  FcVlc,
  FcSupport,
  FcTimeline,
  FcSearch,
  FcManager,
  FcDocument,
} from "react-icons/fc";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

const StoreSection = () => {
  return (
    <Container>
      <div className="title">
        <Heading tag="h5" color="primary" mb="2rem">
          Store Settings
        </Heading>
      </div>
      <Grid
        cols="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Store Information"
          target="/settings/store-information"
          Icon={FcSupport}
          desc="Manage your store information"
        />
        <SettingsCard
          title="Store Identity"
          target="/settings/store-identity"
          Icon={FcPanorama}
          desc="Manage your store identity"
        />
        <SettingsCard
          title="Store Branches"
          target="/settings/branches"
          Icon={FcTimeline}
          desc="Manage your store branches"
        />
        <SettingsCard
          title="Store Domain"
          target="/settings/store-domain"
          Icon={FcGlobe}
          desc="Manage your store domain name"
        />
        <SettingsCard
          title="Delivery & Shipment"
          target="/settings/delivery-shipment"
          Icon={FcInTransit}
          desc="Manage your delivery & shipment methods"
        />
        <SettingsCard
          title="Payment Methods"
          target="/settings/payment-methods"
          Icon={FcMoneyTransfer}
          desc="Manage your orders payment methods"
        />
        <SettingsCard
          title="Store Legal pages"
          target="/settings/legal-pages"
          Icon={FcDocument}
          desc="Pages like Privacy Policy - About Us ..."
        />
        {/* <SettingsCard
          title="Store Currencies"
          target="/settings/store-currencies"
          Icon={FcCurrencyExchange}
          desc="Adjust your currencies used throughout your store"
        /> */}
        <SettingsCard
          title="SEO"
          target="/settings/seo"
          Icon={FcSearch}
          desc="Search Engine optimization improvments"
        />
        <SettingsCard
          title="Maintenance Mode"
          target="/settings/maintenance-mode"
          Icon={FcVlc}
          desc="Put your store into maintanance mode "
        />
        <SettingsCard
          title="Store Staff"
          target="/settings/staff"
          Icon={FcManager}
          desc="Manage your staff roles"
        />
      </Grid>
    </Container>
  );
};

export default StoreSection;
const Container = styled.div`
  margin: 2rem 0;
`;
