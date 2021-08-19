import { useQuery } from "react-query";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import Spacer from "../../components/reusable/Spacer";
import StoreNameAndDescription from "../../components/SettingsPage/StoreInformation/StoreNameAndDescription";
import StoreSocialNetwork from "../../components/SettingsPage/StoreInformation/StoreSocialNetwork";
import StoreTechnicalSupport from "../../components/SettingsPage/StoreInformation/StoreTechnicalSupport";
import Heading from "../../components/StyledComponents/Heading";
import { getStoreInformation } from "../../utils/queries/settingsQueries";

const StoreInformation = () => {
  const { data } = useQuery("store-information", getStoreInformation, {
    suspense: true,
  });
  console.log(data);
  return (
    <div>
      <Heading tag="h5" type="large-title">
        Store Information
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "معلومات المتجر", en: "Store Information" },
            target: "",
          },
        ]}
      />
      <Spacer size={40} />
      <StoreNameAndDescription
        data={{ description: data!.description, name: data!.name }}
      />
      <Spacer size={30} />
      <StoreTechnicalSupport
        data={{
          email: data!.email,
          landline: data!.landline,
          phone: data!.phone,
          whatsapp: data!.whatsapp,
        }}
      />
      <Spacer size={30} />
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
