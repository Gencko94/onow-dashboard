import styled from 'styled-components';

const FooterNavigationLinks = () => {
  return (
    <Container>
      <h6>Useful Links</h6>
      <div className="links-container">
        <div className="item">
          <p>Home</p>
        </div>
        <div className="item">
          <p>About Us</p>
        </div>
        <div className="item">
          <p>Terms & Condition</p>
        </div>
        <div className="item">
          <p>Privacy Policy</p>
        </div>
      </div>
    </Container>
  );
};

export default FooterNavigationLinks;
const Container = styled.div`
  h6 {
    margin-bottom: 1rem;
  }
  .item {
    padding: 0.4rem;
    font-size: 0.8rem;
  }
`;
