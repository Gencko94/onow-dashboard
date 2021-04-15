import styled from 'styled-components';
import { BsCardHeading } from 'react-icons/bs';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
const CustomerProfileInfo = () => {
  return (
    <Container>
      <h5>Customer Personal Info</h5>
      <ContentContainer>
        <FieldContainer>
          <Icon color="#911f1f">
            <BsCardHeading size={25} />
          </Icon>
          <div>
            <p className="label">Customer Full Name</p>
            <p className="value">Ahmad Zaaza</p>
          </div>
        </FieldContainer>
        <FieldContainer>
          <Icon color="#9e3da7">
            <AiOutlinePhone size={25} />
          </Icon>
          <div>
            <p className="label">Customer Phone Number</p>
            <p className="value">+9659874321</p>
          </div>
        </FieldContainer>
        <FieldContainer>
          <Icon color="#c41681">
            <HiOutlineMail size={25} />
          </Icon>
          <div>
            <p className="label">Customer Email Address</p>
            <p className="value">gfox.piano@hotmail.com</p>
          </div>
        </FieldContainer>
        <FieldContainer>
          <Icon color="#137aaa">
            <MdDateRange size={25} />
          </Icon>
          <div>
            <p className="label">Customer Join Date</p>
            <p className="value">2/6/2020</p>
          </div>
        </FieldContainer>
      </ContentContainer>
    </Container>
  );
};

export default CustomerProfileInfo;
const Container = styled.div`
  padding: 0.75rem;
  h5 {
    margin-bottom: 1rem;
  }
`;
const ContentContainer = styled.div`
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
const FieldContainer = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  p.label {
    color: ${props => props.theme.subHeading};
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }
  p.value {
    font-size: 0.8rem;
    font-weight: ${props => props.theme.font.bold};
  }
`;
const Icon = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
