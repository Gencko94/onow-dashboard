import styled from "styled-components";
import AccountSection from "../../components/SettingsPage/MainSettingsPage/AccountSection";
import StoreSection from "../../components/SettingsPage/MainSettingsPage/StoreSection";
import SubscriptionSection from "../../components/SettingsPage/MainSettingsPage/SubscriptionSection";

const Settings = () => {
  return (
    <div>
      <SubscriptionSection />
      <StoreSection />
      <AccountSection />
    </div>
  );
};

export default Settings;
