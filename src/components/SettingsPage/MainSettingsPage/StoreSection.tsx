import {
  FcPanorama,
  FcGlobe,
  FcInTransit,
  FcMoneyTransfer,
  FcVlc,
  FcSupport,
  FcTimeline,
  FcSearch,
} from "react-icons/fc";
import styled from "styled-components";
import SettingsCard from "../../reusable/SettingsCard";

const StoreSection = () => {
  return (
    <Container>
      <h5>Store Settings</h5>
      <div className="cards-container">
        <SettingsCard
          title="Store properties"
          target="/settings/store-properties"
          Icon={FcSupport}
          desc="Manage your store properties"
        />
        <SettingsCard
          title="Store Identity"
          target="/settings/store-identity"
          Icon={FcPanorama}
          desc="Manage your store identity"
        />
        <SettingsCard
          title="Branches & Warehouses"
          target="/settings/branch-warehouse"
          Icon={FcTimeline}
          desc="Manage your store branches & Warehouses"
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
          title="SEO"
          target="/settings/seo"
          Icon={FcSearch}
          desc="Search Engine optimization improvments"
        />
        <SettingsCard
          title="Maintanance Mode"
          target="/settings/maintanance-mode"
          Icon={FcVlc}
          desc="Put your store into maintanance mode "
        />
      </div>
    </Container>
  );
};

export default StoreSection;
const Container = styled.div`
  margin: 2rem 0;

  .cards-container {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
  }
`;
