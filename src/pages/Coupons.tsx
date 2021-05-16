import styled from "styled-components";
import CouponsList from "../components/Coupons/CouponsList/CouponsList";
import CouponsPanel from "../components/Coupons/CouponsPanel/CouponsPanel";

const Coupons = () => {
  return (
    <div>
      <CouponsPanel />
      <CouponsList />
    </div>
  );
};

export default Coupons;
