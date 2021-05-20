import { useState } from "react";
import { useQuery } from "react-query";
import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";
import Modal from "react-modal";
import { getCustomers } from "../utils/queries";
import ModalHead from "../components/reusable/ModalHead";
import { CUSTOMER } from "../interfaces/customers/customers";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    inset: "240px",
    border: "none",

    boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
  },
};
const Customers = ({ storeId }: { storeId: number }) => {
  const { data } = useQuery<CUSTOMER[]>(
    ["customers", storeId],
    () => getCustomers(storeId),
    { suspense: true }
  );
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList data={data!} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={200}
      >
        <ModalHead
          title="Create new Customer"
          closeFunction={() => setModalOpen(false)}
        />

        <AddCustomerModal
          closeFunction={() => setModalOpen(false)}
          storeId={storeId}
        />
      </Modal>
    </div>
  );
};

export default Customers;
