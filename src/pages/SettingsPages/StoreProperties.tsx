import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import StoreInformation from "../../components/SettingsPage/StoreProperties/StoreInformation";
import StoreSocialNetwork from "../../components/SettingsPage/StoreProperties/StoreSocialNetwork";
import StoreTechnicalSupport from "../../components/SettingsPage/StoreProperties/StoreTechnicalSupport";

const StoreProperties = () => {
  return (
    <div>
      <Breadcrumbs
        childLabel="Store Properties"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <StoreInformation />
      <StoreTechnicalSupport />
      <StoreSocialNetwork />
    </div>
  );
};

export default StoreProperties;
