import AccountSection from "../../components/SettingsPage/MainSettingsPage/AccountSection";
import StoreAppearanceSection from "../../components/SettingsPage/MainSettingsPage/StoreAppearanceSection";
import StoreSection from "../../components/SettingsPage/MainSettingsPage/StoreSection";
import SubscriptionSection from "../../components/SettingsPage/MainSettingsPage/SubscriptionSection";

const Settings = () => {
  return (
    <div>
      <SubscriptionSection />
      <StoreSection />
      <StoreAppearanceSection />
      <AccountSection />
    </div>
  );
};

export default Settings;
