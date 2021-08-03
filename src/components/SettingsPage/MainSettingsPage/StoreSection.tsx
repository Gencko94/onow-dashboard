import { useState } from "react";
import {
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
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Modal from "../../Modal/Modal";
import SettingsCard from "../../reusable/SettingsCard";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
import StoreMaintenanceModal from "../StoreMaintenanceModal";

const StoreSection = () => {
  const history = useHistory();
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  return (
    <Container>
      <Heading tag="h4" color="primary" mb="2rem" weight="semibold">
        Store Settings
      </Heading>

      <Grid
        cols="repeat(auto-fill,minmax(250px,1fr))"
        gap="2rem"
        margin="1rem 0"
      >
        <SettingsCard
          title="Store Information"
          cb={() => history.push("/settings/store-information")}
          Icon={FcSupport}
          desc="Manage your store information"
        />

        <SettingsCard
          title="Store Branches"
          cb={() => history.push("/settings/branches")}
          Icon={FcTimeline}
          desc="Manage your store branches"
        />
        <SettingsCard
          title="Store Domain"
          cb={() => history.push("/settings/store-domain")}
          Icon={FcGlobe}
          desc="Manage your store domain name"
        />
        <SettingsCard
          title="Delivery & Shipment"
          cb={() => history.push("/settings/delivery-shipment")}
          Icon={FcInTransit}
          desc="Manage your delivery & shipment methods"
        />
        <SettingsCard
          title="Payment Methods"
          cb={() => history.push("/settings/payment-methods")}
          Icon={FcMoneyTransfer}
          desc="Manage your orders payment methods"
        />
        <SettingsCard
          title="Store Legal pages"
          cb={() => history.push("/settings/legal-pages")}
          Icon={FcDocument}
          desc="Pages like Privacy Policy - About Us ..."
        />

        <SettingsCard
          title="SEO"
          cb={() => history.push("/settings/seo")}
          Icon={FcSearch}
          desc="Search Engine optimization improvements"
        />
        <SettingsCard
          title="Maintenance Mode"
          cb={() => {
            setMaintenanceModalOpen(true);
          }}
          Icon={FcVlc}
          desc="Put your store into maintanance mode "
        />
        <SettingsCard
          title="Store Staff"
          cb={() => history.push("/settings/staff")}
          Icon={FcManager}
          desc="Manage your staff roles"
        />
      </Grid>
      <Modal
        isOpen={maintenanceModalOpen}
        closeFunction={() => {
          setMaintenanceModalOpen(false);
        }}
      >
        <CSSTransition
          classNames="product-option-modal"
          timeout={200}
          unmountOnExit
          in={maintenanceModalOpen}
        >
          <StoreMaintenanceModal
            isOpen={maintenanceModalOpen}
            closeFunction={() => {
              setMaintenanceModalOpen(false);
            }}
          />
        </CSSTransition>
      </Modal>
    </Container>
  );
};

export default StoreSection;
const Container = styled.div`
  margin: 2rem 0;
`;
