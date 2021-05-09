import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import { MdAttachMoney } from 'react-icons/md';
const DashboardStatPanel = () => {
  return (
    <Container>
      <div className="stat-item">
        <Icon color="#da312c">
          <AiOutlineUser size={25} />
        </Icon>
        <div className="details">
          <p className="text">Users Online</p>
          <p className="value">2012</p>
        </div>
      </div>
      <div className="stat-item">
        <Icon color="#2cda66">
          <RiFileList3Line size={25} />
        </Icon>
        <div className="details">
          <p className="text">Total Orders</p>
          <p className="value">238</p>
        </div>
      </div>
      <div className="stat-item">
        <Icon color="#da312c">
          <MdAttachMoney size={25} />
        </Icon>
        <div className="details">
          <p className="text">Revenue</p>
          <p className="value">$3598</p>
        </div>
      </div>
      <div className="stat-item">
        <Icon color="#2c86da">
          <MdAttachMoney size={25} />
        </Icon>
        <div className="details">
          <p className="text">Revenue</p>
          <p className="value">$3598</p>
        </div>
      </div>
    </Container>
  );
};

export default DashboardStatPanel;
const Container = styled.div(
  ({ theme: { breakpoints, boxColor, shadow, font, subHeading } }) => `

  background-color: ${boxColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  
  .stat-item {
    box-shadow: ${shadow};
    border-radius: 8px;
    flex: auto;
    padding: 0.75rem 0.75rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .details {
    margin: 0 0.75rem;
    .text {
      font-size:0.9rem;
      white-space:nowrap;
      color: ${subHeading};
    }
    .value {
      font-size: 1.1rem;
      font-weight: ${font.xbold};
    }
  }
  @media ${breakpoints.md}{
    .details {
      .text {
        font-size:1rem;
      }
    }
  }
  @media ${breakpoints.lg}{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
);
const Icon = styled.span`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${props => props.color};
  color: #fff;
`;
