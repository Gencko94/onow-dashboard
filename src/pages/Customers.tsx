import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useQuery } from "react-query";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import CustomerList from "../components/Customers/CustomerList/CustomerList";
import CustomersPanel from "../components/Customers/CustomersPanel/CustomersPanel";
import AddCustomerModal from "../components/Modal/AddCustomerModal";
import Modal from "../components/Modal/Modal";
import { getCustomers } from "../utils/queries";

const Customers = ({ storeId }: { storeId: number }) => {
  console.log(storeId);
  const { data } = useQuery(
    ["customers", storeId],
    () => getCustomers(storeId),
    { suspense: true }
  );
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <CustomersPanel setModalOpen={setModalOpen} />
      <CustomerList data={data!.results} />
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
