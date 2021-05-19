import SettingsBreadcrumbs from "../../components/SettingsPage/SettingsBreadcrumbs";
import StoreInformation from "../../components/SettingsPage/StoreProperties/StoreInformation";
import StoreSocialNetwork from "../../components/SettingsPage/StoreProperties/StoreSocialNetwork";
import StoreTechnicalSupport from "../../components/SettingsPage/StoreProperties/StoreTechnicalSupport";

const StoreProperties = () => {
  return (
    <div>
      <SettingsBreadcrumbs transId="Store Properties" />
      <StoreInformation />
      <StoreTechnicalSupport />
      <StoreSocialNetwork />
    </div>
  );
};

export default StoreProperties;
