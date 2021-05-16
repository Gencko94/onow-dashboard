import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";
import Modal from "../components/Modal/Modal";

const Customers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList />
      <CSSTransition
        in={modalOpen}
        timeout={100}
        classNames="modal"
        unmountOnExit
      >
        <Modal
          title="Add a New Customer"
          closeFunction={() => setModalOpen(false)}
        >
          <AddCustomerModal />
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Customers;
