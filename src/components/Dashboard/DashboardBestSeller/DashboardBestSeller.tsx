import styled from "styled-components";
// import DashboardOrder from "../DashboardOrders/DashboardOrder";

const DashboardBestSeller = () => {
  return (
    <Container>
      <h5>Best Selling Items</h5>
      <div className="items-container">
        {/* <DashboardOrder /> */}
        {/* <DashboardOrder /> */}
        {/* <DashboardOrder /> */}
      </div>
    </Container>
  );
};

export default DashboardBestSeller;
const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  background-color: ${(props) => props.theme.boxColor};
  padding: 0.75rem;
  align-self: start;
  h5 {
    font-weight: ${(props) => props.theme.font.xbold};
    padding: 0 0.5rem;
  }
  .items-container {
    padding: 0.75rem 0;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.25rem;
  }
`;
