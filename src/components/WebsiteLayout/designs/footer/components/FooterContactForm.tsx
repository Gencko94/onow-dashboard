import styled from 'styled-components';

const FooterContactForm = () => {
  return (
    <Container>
      <h6>Contact Us</h6>
      <div>
        <input disabled placeholder="Name" />
        <input disabled placeholder="Email" />
        <textarea disabled rows={4} placeholder="Message" />
        <div className="flex">
          <button>Submit</button>
        </div>
      </div>
    </Container>
  );
};

export default FooterContactForm;
const Container = styled.div`
  h6 {
    margin-bottom: 1rem;
  }
  input,
  textarea {
    padding: 0.4rem;
    font-size: 0.8rem;
    border-radius: 5px;
    background-color: ${props => props.theme.inputColorLight};
    margin-bottom: 0.5rem;
    resize: none;
    width: 100%;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      padding: 0.25rem;
      font-size: 0.8rem;
      border-radius: 5px;
      background-color: ${props => props.theme.inputColorLight};
    }
  }
`;
