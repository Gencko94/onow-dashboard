import { BsArrowRightShort } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import styled from "styled-components";

import Ripple from "../../reusable/Ripple";

import Paragraph from "../../StyledComponents/Paragraph";

const OverviewReportCard = () => {
  return (
    <Card>
      <div className="info">
        <div className="avatar">
          <RiFileList3Line size={25} />
        </div>
        <div className="content">
          <Paragraph fontSize="0.9rem" weight="semibold">
            ORDERS
          </Paragraph>
          <Paragraph fontSize="1.1rem" weight="bold">
            3450
          </Paragraph>
        </div>
      </div>
      <div className="actions">
        <button className="action-btn">
          <Paragraph fontSize="0.9rem" weight="semibold">
            Go to Orders
          </Paragraph>
          <BsArrowRightShort size={25} />
          <Ripple />
        </button>
      </div>
    </Card>
  );
};

export default OverviewReportCard;
const Card = styled.div`
  background-color: ${(props) => props.theme.subtleBackground};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  .info {
    padding: 1rem;
    display: flex;
    align-items: center;
    border-bottom: ${(props) => props.theme.border};
    .avatar {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: ${(props) => props.theme.primary};
    }
    .content {
      margin: 0 1rem;
    }
  }
  .actions {
    padding: 0.75rem;
    background-color: ${(props) => props.theme.subtleFloating};
    .action-btn {
      position: relative;
      overflow: hidden;
      transition: background 100ms ease;
      display: flex;
      align-items: center;
      border-radius: 6px;
      color: ${(props) => props.theme.primary};
      padding: 0.25rem;
      &:hover {
        background-color: ${(props) => props.theme.accent3};
      }
    }
  }
`;
