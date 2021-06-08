import Breadcrumbs from "../../../components/reusable/Breadcrumbs";

const CreatePaymentGatewayAccount = () => {
  return (
    <div>
      <Breadcrumbs
        childLabel="Create Payment Gateway Account"
        parentLabel="Payment Methods"
        parentTarget="/settings/payment-methods"
      />
    </div>
  );
};

export default CreatePaymentGatewayAccount;
