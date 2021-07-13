import { useQuery } from "react-query";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import StoreNameAndDescription from "../../components/SettingsPage/StoreInformation/StoreNameAndDescription";
import StoreSocialNetwork from "../../components/SettingsPage/StoreInformation/StoreSocialNetwork";
import StoreTechnicalSupport from "../../components/SettingsPage/StoreInformation/StoreTechnicalSupport";
import { getStoreInformation } from "../../utils/queries/settingsQueries";

const StoreInformation = () => {
  const { data } = useQuery("store-information", getStoreInformation, {
    suspense: true,
  });
  console.log(data);
  return (
    <div>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Store Properties"
          parentLabel="Settings"
          parentTarget="/settings"
        />
      </HeaderContainer>
      <StoreNameAndDescription
        data={{ description: data!.description, name: data!.name }}
      />
      <StoreTechnicalSupport
        data={{
          email: data!.email,
          landline: data!.landline,
          phone: data!.phone,
          whatsapp: data!.whatsapp,
        }}
      />
      <StoreSocialNetwork
        data={{
          facebook: data!.facebook,
          instagram: data!.instagram,
          twitter: data!.twitter,
          snapchat: data!.snapchat,
        }}
      />
    </div>
  );
};

export default StoreInformation;
