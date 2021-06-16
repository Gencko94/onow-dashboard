import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCoupons } from "../../../utils/queries";
import TableHead from "../../reusable/TableHead";
import CouponItem from "./CouponItem";

const CouponsList = () => {
  const cols = useMemo(
    () => [
      { title: "couponName", sortable: false },
      { title: "status", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const [sortBy, setSortBy] = useState({
    by: "orderDate",
    order: "desc",
  });
  const { t } = useTranslation();
  const { data } = useQuery(["coupons", sortBy], () => getCoupons(sortBy), {
    suspense: true,
  });
  return (
    <Container>
      <TableHead cols={cols} />

      <div>
        {data!.map((coupon) => (
          <CouponItem key={coupon.id} coupon={coupon} sortBy={sortBy} />
        ))}
      </div>
    </Container>
  );
};

export default CouponsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
