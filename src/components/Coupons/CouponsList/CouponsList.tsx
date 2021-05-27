import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
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
  const { t } = useTranslation();
  return (
    <Container>
      <TableHead cols={cols} />

      <div>
        {[0, 1, 2, 3].map((i) => (
          <CouponItem />
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
