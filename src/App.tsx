import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';
import Login from './pages/Login';
import ScrollToTopOnMount from './utils/ScrollToTopOnMount';
import { lazy, Suspense } from 'react';
import Loading from './utils/Loading';
import ThemeProvider from './contexts/ThemeContext';
import GlobalStyle from './globalStyles';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import Layout from './layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
const Customers = lazy(() => import('./pages/Customers'));
const CustomerProfile = lazy(() => import('./pages/CustomerProfile'));
const Orders = lazy(() => import('./pages/Orders'));
const Order = lazy(() => import('./pages/Order'));
const Coupons = lazy(() => import('./pages/Coupons'));
const Coupon = lazy(() => import('./pages/Coupon'));
const WebsiteLayout = lazy(() => import('./pages/WebsiteLayout'));
const BlockStyleCustomizePage = lazy(
  () => import('./pages/BlockStyleCustomizePage')
);
const BlockStyleSelectionPage = lazy(
  () => import('./pages/BlockStyleSelectionPage')
);
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
          <Router>
            <Suspense fallback={<Loading />}>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                  <GlobalStyle />
                  <ScrollToTopOnMount />
                  <Route exact path="/" component={Login} />
                  <Layout>
                    <Switch>
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/products" component={Products} />
                      <Route exact path="/orders" component={Orders} />
                      <Route exact path="/orders/:id" component={Order} />
                      <Route exact path="/customers" component={Customers} />
                      <Route exact path="/coupons" component={Coupons} />
                      <Route exact path="/coupons/coupon" component={Coupon} />
                      <Route
                        exact
                        path="/website-layout"
                        component={WebsiteLayout}
                      />
                      <Route
                        exact
                        path="/website-layout/block/:type"
                        component={BlockStyleSelectionPage}
                      />
                      <Route
                        exact
                        path="/website-layout/block-customize/:type"
                        component={BlockStyleCustomizePage}
                      />
                      <Route
                        exact
                        path="/customers/:id"
                        component={CustomerProfile}
                      />
                      <Route
                        exact
                        path="/products/new/:type"
                        component={AddProduct}
                      />
                    </Switch>
                  </Layout>
                </ThemeProvider>
              </QueryClientProvider>
            </Suspense>
          </Router>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
