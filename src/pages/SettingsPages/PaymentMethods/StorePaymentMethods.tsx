import { useState } from "react";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import OnlinePayments from "../../../components/SettingsPage/StorePaymentMethods/OnlinePayments";
import PaymentMethodsTabs from "../../../components/SettingsPage/StorePaymentMethods/PaymentMethodsTabs";

const StorePaymentMethods = () => {
  const [activeTab] = useState<0>(0);
  return (
    <div>
      <Breadcrumbs
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "طرق الدفع", en: "Payment gateways" },
            target: "",
          },
        ]}
      />
      <PaymentMethodsTabs activeTab={activeTab} />
      {activeTab === 0 && <OnlinePayments />}
    </div>
  );
};

export default StorePaymentMethods;
