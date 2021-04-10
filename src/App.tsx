import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import Home from './pages/Home';
import ScrollToTopOnMount from './utils/ScrollToTopOnMount';
import { Suspense } from 'react';
import Loading from './utils/Loading';
import ThemeProvider from './contexts/ThemeContext';
import GlobalStyle from './globalStyles';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-placeholder/lib/reactPlaceholder.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error!{' '}
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
              <Router>
                <ThemeProvider>
                  <GlobalStyle />
                  <ScrollToTopOnMount />
                  <Switch>
                    <Route path="/" component={Home} />
                  </Switch>
                </ThemeProvider>
              </Router>
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
