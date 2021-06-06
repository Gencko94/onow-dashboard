import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import StoreNameAndDescription from "../../components/SettingsPage/StoreInformation/StoreNameAndDescription";
import StoreSocialNetwork from "../../components/SettingsPage/StoreInformation/StoreSocialNetwork";
import StoreTechnicalSupport from "../../components/SettingsPage/StoreInformation/StoreTechnicalSupport";

const StoreInformation = () => {
  return (
    <div>
      <Breadcrumbs
        childLabel="Store Properties"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <StoreNameAndDescription />
      <StoreTechnicalSupport />
      <StoreSocialNetwork />
    </div>
  );
};

export default StoreInformation;
