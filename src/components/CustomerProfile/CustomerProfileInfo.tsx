import styled from 'styled-components';
import { BsCardHeading } from 'react-icons/bs';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
import { CUSTOMER } from '../../interfaces/customers/customers';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
interface IProps {
  data: CUSTOMER;
}

const CustomerProfileInfo = ({ data }: IProps) => {
  return (
    <Container>
      <h4>Customer Personal Info</h4>
      <ContentContainer>
        <div className="stat-item">
          <Icon color="#911f1f">
            <BsCardHeading size={25} />
          </Icon>
          <div className="details">
            <p className="text">Full Name</p>
            <p className="value">{`${data.firstName} ${data.lastName}`}</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#9e3da7">
            <AiOutlinePhone size={25} />
          </Icon>
          <div className="details">
            <p className="text">Phone Number</p>
            <p className="value">{data.phoneNumber}</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#c41681">
            <HiOutlineMail size={25} />
          </Icon>
          <div className="details">
            <p className="text">Email Address</p>
            <p className="value">{data.email}</p>
          </div>
        </div>
        <div className="stat-item">
          <Icon color="#137aaa">
            <MdDateRange size={25} />
          </Icon>
          <div className="details">
            <p className="text">Join Date</p>
            <p className="value">
              {format(parseISO(data.joinDate), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
      </ContentContainer>
    </Container>
  );
};

export default CustomerProfileInfo;
const Container = styled.div`
  padding: 0.75rem;
  h4 {
    margin-bottom: 1rem;
  }
`;
const ContentContainer = styled.div(
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
      // font-size: 1.1rem;
      font-weight: ${font.bold};
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
