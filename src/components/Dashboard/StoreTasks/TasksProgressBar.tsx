import styled from "styled-components";

interface IProps {
  completed: number;
}

const TasksProgressBar = ({ completed }: IProps) => {
  return (
    <Container width={completed}>
      <div className="progress">
        <p>{completed}% Completed</p>
      </div>
    </Container>
  );
};

export default TasksProgressBar;
const Container = styled.div<{ width: number }>`
  border-radius: 50px;
  width: 55%;
  height: 25px;
  background-color: #ececec;
  .progress {
    border-radius: 50px;
    background: linear-gradient(90deg, #60d098, #45a787);
    width: ${(props) => props.width}%;
    padding: 0 0.5rem;
    p {
      color: #fff;
      height: 25px;
      font-size: 0.9rem;
    }
  }
`;
