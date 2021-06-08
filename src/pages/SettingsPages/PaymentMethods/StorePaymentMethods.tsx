import { useState } from "react";
import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import OnlinePayments from "../../../components/SettingsPage/StorePaymentMethods/OnlinePayments";
import PaymentMethodsTabs from "../../../components/SettingsPage/StorePaymentMethods/PaymentMethodsTabs";

const StorePaymentMethods = () => {
  const [activeTab, setActiveTab] = useState<0>(0);
  return (
    <div>
      <Breadcrumbs
        childLabel="Payment Methods"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <PaymentMethodsTabs activeTab={activeTab} />
      <Wrapper>{activeTab === 0 && <OnlinePayments />}</Wrapper>
    </div>
  );
};

export default StorePaymentMethods;
const Wrapper = styled.div`
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;
