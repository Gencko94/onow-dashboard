import { useState } from "react";

import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";

const Customers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList setModalOpen={setModalOpen} />

      <AddCustomerModal
        isOpen={modalOpen}
        closeFunction={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Customers;
