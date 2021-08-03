import { useState } from "react";
import { CSSTransition } from "react-transition-group";

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
      <Modal isOpen={modalOpen} closeFunction={() => setModalOpen(false)}>
        <CSSTransition
          classNames="product-option-modal"
          timeout={200}
          unmountOnExit
          in={modalOpen}
        >
          <AddCustomerModal
            isOpen={modalOpen}
            closeFunction={() => setModalOpen(false)}
          />
        </CSSTransition>
      </Modal>
    </div>
  );
};

export default Customers;
