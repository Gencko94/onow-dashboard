import styled from 'styled-components';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
const FooterOfficeLocation = () => {
  return (
    <Container>
      <h6>Our Location</h6>
      <div className="flex">
        <span className="icon">
          <AiOutlinePhone size={22} />
        </span>
        <p>+965 658 87 26</p>
      </div>
      <div className="flex">
        <span className="icon">
          <HiOutlineMail size={22} />
        </span>
        <p>email@email.com</p>
      </div>
    </Container>
  );
};

export default FooterOfficeLocation;
const Container = styled.div`
  h6 {
    margin-bottom: 1rem;
  }
  .flex {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.4rem;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      margin: 0 0.25rem;
      font-size: 0.8rem;
    }
  }
`;
