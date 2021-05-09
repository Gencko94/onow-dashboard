import styled from 'styled-components';

const ExportAs = () => {
  return (
    <Container>
      <p>Export As</p>
      <div className="btn-group">
        <button>CSV</button>
        <span />
        <button>XLS</button>
      </div>
    </Container>
  );
};

export default ExportAs;
const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 0.9rem;
  }
  .btn-group {
    span {
      border-right: ${props => props.theme.border};
    }
    margin: 0 0.5rem;
    display: flex;
    background-color: #bdbdbd;
    border-radius: 6px;
    overflow: hidden;

    button {
      padding: 0.25rem 0.5rem;
      font-size: 0.9rem;
      transition: background 75ms ease;
      &:hover {
        background-color: #9b9898;
      }
    }
  }
`;
