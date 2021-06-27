import { useState } from "react";
import { useQuery } from "react-query";
import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";

import { getCustomers } from "../utils/queries";
import { CUSTOMER } from "../interfaces/customers/customers";
import Modal from "../components/Modal/Modal";

const Customers = ({ storeId }: { storeId: number }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList />
      <Modal
        isOpen={modalOpen}
        closeFunction={() => setModalOpen(false)}
        title="Create new Customer"
      >
        <AddCustomerModal
          closeFunction={() => setModalOpen(false)}
          storeId={storeId}
        />
      </Modal>
    </div>
  );
};

export default Customers;
