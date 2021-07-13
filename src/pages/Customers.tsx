import { useState } from "react";

import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";

import Modal from "../components/Modal/Modal";

const Customers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList setModalOpen={setModalOpen} />
      <Modal
        isOpen={modalOpen}
        closeFunction={() => setModalOpen(false)}
        title="Create new Customer"
      >
        <AddCustomerModal closeFunction={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Customers;
