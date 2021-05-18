import styled from "styled-components";

interface IProps {
  title: string;
}

const TableEmpty = ({ title }: IProps) => {
  return (
    <Container>
      <h6>{title}</h6>
    </Container>
  );
};

export default TableEmpty;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;
