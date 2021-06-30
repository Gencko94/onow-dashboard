import NotFound from "../../pages/NotFound";

interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void;
  error: any;
}

const ErrorBoundaryComponent = ({ resetErrorBoundary, error }: IProps) => {
  if (error.response) {
    if (error.response.status === 404) {
      return <NotFound />;
    }
  }
  return (
    <div>
      <h1>Hello From Error Boundary Component</h1>
      Something went wrong , please try again
      <button onClick={() => resetErrorBoundary()}>Try again</button>
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  );
};

export default ErrorBoundaryComponent;
