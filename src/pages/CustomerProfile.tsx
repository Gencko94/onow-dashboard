import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import CustomerProfileInfo from "../components/CustomerProfile/CustomerProfileInfo";
import CustomerProfileOrders from "../components/CustomerProfile/CustomerProfileOrders/CustomerProfileOrders";
import CustomerProfilePanel from "../components/CustomerProfile/CustomerProfilePanel/CustomerProfilePanel";
import { CUSTOMER } from "../interfaces/customers/customers";
import { getSingleCustomer } from "../utils/queries";

const CustomerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<CUSTOMER>(
    ["customer", id],
    () => getSingleCustomer(id),
    {
      suspense: true,
    }
  );
  return (
    <div>
      <CustomerProfilePanel />
      <hr />
      <CustomerProfileInfo data={data!} />
      <hr />
      <CustomerProfileOrders />
    </div>
  );
};

export default CustomerProfile;
