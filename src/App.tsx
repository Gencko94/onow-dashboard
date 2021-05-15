import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";
import Login from "./pages/Login";
import ScrollToTopOnMount from "./utils/ScrollToTopOnMount";
import { lazy, Suspense } from "react";
import Loading from "./utils/Loading";
import ThemeProvider from "./contexts/ThemeContext";
import GlobalStyle from "./globalStyles";
import { ErrorBoundary } from "react-error-boundary";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-placeholder/lib/reactPlaceholder.css";
import Layout from "./layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
const Customers = lazy(() => import("./pages/Customers"));
const Categories = lazy(() => import("./pages/Categories"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
const Orders = lazy(() => import("./pages/Orders"));
const Order = lazy(() => import("./pages/Order"));
const Coupons = lazy(() => import("./pages/Coupons"));
const Coupon = lazy(() => import("./pages/Coupon"));
const WebsiteLayout = lazy(() => import("./pages/WebsiteLayout"));
const HeaderCustomizer = lazy(() => import("./pages/HeaderCustomizer"));
const FooterCustomizer = lazy(() => import("./pages/FooterCustomizer"));
const Settings = lazy(() => import("./pages/SettingsPages/Settings"));
const AccountSettings = lazy(
  () => import("./pages/SettingsPages/AccountSettings")
);
const ProductListGridCustomizer = lazy(
  () => import("./pages/ProductListGridCustomizer")
);

const DesignSelectionPage = lazy(() => import("./pages/DesignSelectionPage"));
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
              There was an error!{" "}
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
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
                      <Route exact path="/categories" component={Categories} />
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
                        path="/website-layout/design-select/:type"
                        component={DesignSelectionPage}
                      />
                      <Route
                        exact
                        path="/website-layout/block-customize/header/:id"
                        component={HeaderCustomizer}
                      />
                      <Route
                        exact
                        path="/website-layout/block-customize/footer/:id"
                        component={FooterCustomizer}
                      />
                      <Route
                        exact
                        path="/website-layout/block-customize/product-grid/:id"
                        component={ProductListGridCustomizer}
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
                      <Route exact path="/settings" component={Settings} />
                      <Route
                        exact
                        path="/settings/account-settings"
                        component={AccountSettings}
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
